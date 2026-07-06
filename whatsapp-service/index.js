/**
 * SellBot WhatsApp Service — Baileys-based
 * 
 * Free WhatsApp connection via QR code or 6-digit pairing code.
 * No Meta Business API, no payment, no webhook needed.
 * 
 * Runs as separate Node.js process on port 3002.
 * Next.js app communicates via internal HTTP.
 */

const express = require('express')
const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion } = require('baileys')
const QRCode = require('qrcode')
const { Boom } = require('@hapi/boom')
const fs = require('fs')
const path = require('path')

const PORT = 3002
const AUTH_DIR = path.join(__dirname, 'auth_state')
const NEXT_APP_URL = process.env.NEXT_APP_URL || 'http://localhost:3001'

// Ensure auth dir exists
if (!fs.existsSync(AUTH_DIR)) {
  fs.mkdirSync(AUTH_DIR, { recursive: true })
}

let sock = null
let connectionState = 'disconnected' // disconnected | connecting | connected | waiting_for_qr
let currentQR = null
let currentPairingCode = null
let phoneNumber = null

const app = express()
app.use(express.json())

// ============================================================
// WhatsApp Connection
// ============================================================

async function connectToWhatsApp() {
  const { version, isLatest } = await fetchLatestBaileysVersion()
  console.log(`[Baileys] Using WA version ${version}, isLatest: ${isLatest}`)

  const { state, saveCreds } = await useMultiFileAuthState(AUTH_DIR)

  sock = makeWASocket({
    version,
    auth: state,
    printQRInTerminal: false,
    logger: require('pino')({ level: 'silent' }),
    browser: ['SellBot', 'Chrome', '1.0.0'],
    markOnlineOnConnect: false,
  })

  connectionState = 'connecting'

  // Save credentials whenever they update
  sock.ev.on('creds.update', saveCreds)

  // Connection updates
  sock.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect, qr } = update

    if (qr) {
      currentQR = qr
      connectionState = 'waiting_for_qr'
      console.log('[Baileys] QR code generated — waiting for scan')
      
      // If we have a phone number, request pairing code
      if (phoneNumber) {
        try {
          const code = await sock.requestPairingCode(phoneNumber)
          currentPairingCode = code
          console.log(`[Baileys] Pairing code: ${code}`)
        } catch (e) {
          console.error('[Baileys] Pairing code error:', e?.message)
        }
      }
    }

    if (connection === 'connecting') {
      connectionState = 'connecting'
    }

    if (connection === 'open') {
      connectionState = 'connected'
      currentQR = null
      currentPairingCode = null
      console.log('[Baileys] ✅ Connected to WhatsApp!')
      
      // Get the connected number
      const user = sock.user
      if (user?.id) {
        phoneNumber = user.id.split(':')[0]
        console.log(`[Baileys] Connected as: ${phoneNumber}`)
      }
    }

    if (connection === 'close') {
      const statusCode = (lastDisconnect?.error instanceof Boom) 
        ? lastDisconnect.error.output.statusCode 
        : 0
      
      console.log(`[Baileys] Connection closed. Status: ${statusCode}`)
      
      if (statusCode === DisconnectReason.loggedOut) {
        // Logged out — clear auth state and reconnect fresh
        console.log('[Baileys] Logged out — clearing auth state')
        fs.rmSync(AUTH_DIR, { recursive: true, force: true })
        fs.mkdirSync(AUTH_DIR, { recursive: true })
        connectToWhatsApp()
      } else if (statusCode === DisconnectReason.restartRequired) {
        // Restart required — just reconnect
        connectToWhatsApp()
      } else {
        // Other error — wait and retry
        connectionState = 'disconnected'
        setTimeout(() => connectToWhatsApp(), 3000)
      }
    }
  })

  // Incoming messages
  sock.ev.on('messages.upsert', async (m) => {
    try {
      for (const msg of m.messages) {
        // Skip if message is from me (bot)
        if (msg.key.fromMe) continue
        
        // Skip status broadcasts
        if (msg.key.remoteJid === 'status@broadcast') continue
        
        const jid = msg.key.remoteJid
        if (!jid) continue
        
        // Extract phone number (remove @s.whatsapp.net)
        const fromNumber = jid.split('@')[0]
        
        // Only handle individual chats (not groups)
        if (!jid.includes('@s.whatsapp.net')) continue
        
        // Extract message text
        let text = ''
        if (msg.message?.conversation) {
          text = msg.message.conversation
        } else if (msg.message?.extendedTextMessage?.text) {
          text = msg.message.extendedTextMessage.text
        } else {
          // Not a text message
          await sendWhatsAppMessage(fromNumber, 'Assalam o Alaikum! Hum abhi text messages handle kar sakte hain. Apna sawal text me likhein 🙏')
          continue
        }

        // Get sender name
        const senderName = msg.pushName || fromNumber
        
        console.log(`[Baileys] Message from ${fromNumber} (${senderName}): ${text.substring(0, 60)}`)
        
        // Forward to Next.js app for processing
        await processIncomingMessage(fromNumber, senderName, text)
      }
    } catch (e) {
      console.error('[Baileys] Message handling error:', e?.message)
    }
  })
}

// ============================================================
// Message Processing — call Next.js API
// ============================================================

async function processIncomingMessage(from, senderName, text) {
  try {
    const response = await fetch(`${NEXT_APP_URL}/api/baileys/message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        senderName,
        text,
      }),
    })

    const data = await response.json()
    
    if (data.reply) {
      await sendWhatsAppMessage(from, data.reply)
    }
  } catch (e) {
    console.error('[Baileys] Process message error:', e?.message)
    // Fallback reply
    await sendWhatsAppMessage(from, 'Assalam o Alaikum! Aapka message mil gaya. Owner thodi der me reply karenge. 🙏')
  }
}

// ============================================================
// Send WhatsApp Message
// ============================================================

async function sendWhatsAppMessage(to, text) {
  try {
    if (!sock || connectionState !== 'connected') {
      console.error('[Baileys] Cannot send — not connected')
      return false
    }
    
    const jid = to.includes('@') ? to : `${to}@s.whatsapp.net`
    await sock.sendMessage(jid, { text })
    console.log(`[Baileys] Sent to ${to}: ${text.substring(0, 50)}...`)
    return true
  } catch (e) {
    console.error('[Baileys] Send error:', e?.message)
    return false
  }
}

// ============================================================
// HTTP API — for Next.js to communicate
// ============================================================

// Get connection status
app.get('/status', (req, res) => {
  res.json({
    state: connectionState,
    phoneNumber: phoneNumber,
    hasQR: !!currentQR,
    pairingCode: currentPairingCode,
  })
})

// Get QR code as base64 image
app.get('/qr', async (req, res) => {
  if (!currentQR) {
    // Force generate a new QR by reconnecting
    if (connectionState === 'disconnected' || connectionState === 'connected') {
      // Clear auth and reconnect for fresh QR
      fs.rmSync(AUTH_DIR, { recursive: true, force: true })
      fs.mkdirSync(AUTH_DIR, { recursive: true })
      connectToWhatsApp()
    }
    return res.json({ qr: null, message: 'QR not available yet. Reconnecting...' })
  }
  
  try {
    const qrImage = await QRCode.toDataURL(currentQR, { width: 256 })
    res.json({ qr: qrImage })
  } catch (e) {
    res.json({ qr: null, error: e.message })
  }
})

// Request pairing code for a phone number
app.post('/pair', async (req, res) => {
  const { phone } = req.body
  
  if (!phone) {
    return res.status(400).json({ error: 'Phone number required' })
  }
  
  // Clean phone number (E.164 without +)
  const cleanPhone = phone.replace(/\D/g, '')
  phoneNumber = cleanPhone
  
  if (sock && connectionState === 'waiting_for_qr') {
    try {
      const code = await sock.requestPairingCode(cleanPhone)
      currentPairingCode = code
      console.log(`[Baileys] Pairing code generated: ${code}`)
      return res.json({ code })
    } catch (e) {
      return res.status(500).json({ error: e.message })
    }
  } else {
    // Reconnect to trigger QR + pairing code
    fs.rmSync(AUTH_DIR, { recursive: true, force: true })
    fs.mkdirSync(AUTH_DIR, { recursive: true })
    phoneNumber = cleanPhone
    connectToWhatsApp()
    return res.json({ message: 'Reconnecting to generate pairing code. Try again in 3 seconds.' })
  }
})

// Send message (for Next.js to use)
app.post('/send', async (req, res) => {
  const { to, text } = req.body
  
  if (!to || !text) {
    return res.status(400).json({ error: 'to and text required' })
  }
  
  const success = await sendWhatsAppMessage(to, text)
  res.json({ success })
})

// Disconnect / logout
app.post('/disconnect', async (req, res) => {
  if (sock) {
    try {
      await sock.logout()
    } catch (e) {
      console.error('[Baileys] Logout error:', e?.message)
    }
  }
  fs.rmSync(AUTH_DIR, { recursive: true, force: true })
  fs.mkdirSync(AUTH_DIR, { recursive: true })
  connectionState = 'disconnected'
  currentQR = null
  currentPairingCode = null
  phoneNumber = null
  res.json({ success: true })
})

// Health check
app.get('/health', (req, res) => {
  res.json({ ok: true, state: connectionState })
})

// ============================================================
// Start
// ============================================================

app.listen(PORT, '127.0.0.1', () => {
  console.log(`[SellBot WhatsApp Service] Running on http://127.0.0.1:${PORT}`)
  connectToWhatsApp()
})

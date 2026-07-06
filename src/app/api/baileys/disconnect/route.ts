import { NextResponse } from 'next/server'

export async function POST() {
  try {
    const res = await fetch('http://127.0.0.1:3002/disconnect', {
      method: 'POST',
    })
    const data = await res.json()
    return NextResponse.json(data)
  } catch (e: any) {
    return NextResponse.json({ error: 'WhatsApp service offline' }, { status: 502 })
  }
}

import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SellBot.pk — AI Sales Agent for Pakistani WhatsApp Businesses",
  description: "AI agent jo aapke WhatsApp pe 24/7 Roman Urdu me customers ko reply karta hai, orders confirm karta hai, aur revenue report bhejta hai. Bilkul free connect — QR code ya pairing code.",
  keywords: ["WhatsApp AI", "Pakistan business", "sales agent", "Roman Urdu AI", "COD verification", "SellBot"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

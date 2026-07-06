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
  title: "SellBot — AI Sales Agent for Your Business",
  description: "SellBot is an AI sales agent that connects to your business number and replies to customers 24/7 — answers questions, takes orders, confirms cash-on-delivery, and sends you daily revenue reports, all on autopilot.",
  keywords: [
    "AI sales agent",
    "business chat automation",
    "24/7 customer support",
    "order automation",
    "COD verification",
    "revenue reports",
    "SellBot",
  ],
  openGraph: {
    title: "SellBot — AI Sales Agent for Your Business",
    description: "Your AI sales agent that never misses a customer. Connects to your business number and handles replies, orders, COD verification, and daily revenue reports — 24/7 on autopilot.",
    url: "https://sellbot.app",
    siteName: "SellBot",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SellBot — AI Sales Agent for Your Business",
    description: "Your AI sales agent that never misses a customer. Connects to your business number and handles replies, orders, COD verification, and daily revenue reports — 24/7 on autopilot.",
  },
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

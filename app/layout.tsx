import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'WhatsApp AI Agent',
  description: 'AI-powered WhatsApp message responder',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

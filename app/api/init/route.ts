import { NextResponse } from 'next/server'

// This endpoint initializes the WhatsApp client
export async function GET() {
  try {
    // Import and initialize WhatsApp simulation
    await import('@/lib/whatsapp')

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ success: false })
  }
}

export const dynamic = 'force-dynamic'

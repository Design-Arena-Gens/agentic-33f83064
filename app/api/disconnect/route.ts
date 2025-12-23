import { NextResponse } from 'next/server'

export async function POST() {
  try {
    global.shouldConnect = false
    global.whatsappClient = null
    global.qrCodeData = null
    global.isConnected = false

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to disconnect' }, { status: 500 })
  }
}

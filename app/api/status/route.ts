import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const isConnected = global.isConnected || false
    const qr = global.qrCodeData || null

    let status = 'Disconnected'
    if (isConnected) {
      status = 'Connected - AI is active'
    } else if (qr) {
      status = 'Waiting for QR scan'
    } else if (global.shouldConnect) {
      status = 'Initializing...'
    }

    return NextResponse.json({
      connected: isConnected,
      status,
      qr
    })
  } catch (error) {
    return NextResponse.json({
      connected: false,
      status: 'Error',
      qr: null
    })
  }
}

import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { apiKey } = await req.json()

    if (!apiKey) {
      return NextResponse.json({ error: 'API key required' }, { status: 400 })
    }

    // Store API key in memory (in production, use secure storage)
    global.openaiApiKey = apiKey
    global.shouldConnect = true

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to connect' }, { status: 500 })
  }
}

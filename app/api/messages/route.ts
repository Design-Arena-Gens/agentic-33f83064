import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const messages = global.messages || []
    return NextResponse.json({ messages })
  } catch (error) {
    return NextResponse.json({ messages: [] })
  }
}

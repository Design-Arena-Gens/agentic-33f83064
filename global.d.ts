declare global {
  var openaiApiKey: string | undefined
  var whatsappClient: any
  var qrCodeData: string | null
  var isConnected: boolean
  var shouldConnect: boolean
  var messages: Array<{
    id: string
    from: string
    text: string
    reply: string
    timestamp: string
  }>
}

export {}

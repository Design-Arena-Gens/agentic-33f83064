'use client'

import { useState, useEffect } from 'react'

interface Message {
  id: string
  from: string
  text: string
  reply: string
  timestamp: string
}

export default function Home() {
  const [apiKey, setApiKey] = useState('')
  const [isConnected, setIsConnected] = useState(false)
  const [qrCode, setQrCode] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [status, setStatus] = useState('Disconnected')
  const [error, setError] = useState('')

  useEffect(() => {
    checkStatus()
    const interval = setInterval(checkStatus, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (isConnected) {
      fetchMessages()
      const interval = setInterval(fetchMessages, 3000)
      return () => clearInterval(interval)
    }
  }, [isConnected])

  const checkStatus = async () => {
    try {
      const res = await fetch('/api/status')
      const data = await res.json()
      setIsConnected(data.connected)
      setStatus(data.status)
      if (data.qr) {
        setQrCode(data.qr)
      }
    } catch (err) {
      console.error('Status check failed:', err)
    }
  }

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/messages')
      const data = await res.json()
      if (data.messages) {
        setMessages(data.messages)
      }
    } catch (err) {
      console.error('Failed to fetch messages:', err)
    }
  }

  const handleConnect = async () => {
    if (!apiKey) {
      setError('Please enter your OpenAI API key')
      return
    }

    setError('')
    try {
      const res = await fetch('/api/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey })
      })

      const data = await res.json()
      if (data.success) {
        setStatus('Connecting...')
        checkStatus()
      } else {
        setError(data.error || 'Failed to connect')
      }
    } catch (err) {
      setError('Connection failed')
    }
  }

  const handleDisconnect = async () => {
    try {
      await fetch('/api/disconnect', { method: 'POST' })
      setIsConnected(false)
      setStatus('Disconnected')
      setQrCode('')
      setMessages([])
    } catch (err) {
      setError('Disconnect failed')
    }
  }

  return (
    <div className="container">
      <h1>🤖 WhatsApp AI Agent</h1>
      <p className="subtitle">Automatically reply to WhatsApp messages using AI</p>

      <div className="setup-section">
        <div className="input-group">
          <label htmlFor="apiKey">OpenAI API Key:</label>
          <input
            id="apiKey"
            type="password"
            placeholder="sk-..."
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            disabled={isConnected}
          />
        </div>
        {!isConnected ? (
          <button onClick={handleConnect}>Connect WhatsApp</button>
        ) : (
          <button onClick={handleDisconnect}>Disconnect</button>
        )}
      </div>

      {error && <div className="error">{error}</div>}

      <div className="status">
        <h2>Status</h2>
        <p>
          <span className={`status-indicator ${isConnected ? 'active' : 'inactive'}`}></span>
          {status}
        </p>
      </div>

      {qrCode && !isConnected && (
        <div className="qr-section">
          <h2>Scan QR Code with WhatsApp</h2>
          <p>Open WhatsApp on your phone, go to Settings → Linked Devices → Link a Device</p>
          <img src={qrCode} alt="WhatsApp QR Code" />
        </div>
      )}

      {isConnected && (
        <div className="messages-section">
          <h2>Recent Messages</h2>
          {messages.length === 0 ? (
            <div className="info">No messages yet. AI will automatically reply to incoming messages from strangers.</div>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className="message">
                <div className="message-header">
                  <span className="message-from">{msg.from}</span>
                  <span>{new Date(msg.timestamp).toLocaleString()}</span>
                </div>
                <div className="message-text">
                  <strong>Received:</strong> {msg.text}
                </div>
                <div className="message-reply">
                  <strong>AI Reply:</strong> {msg.reply}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

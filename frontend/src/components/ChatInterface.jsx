import { useState, useRef, useEffect } from 'react'
import { chat } from '../api'
import ChatMessage from './ChatMessage'

export default function ChatInterface({ repoUrl }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    if (repoUrl) {
      setMessages([{
        role: 'assistant',
        content: `Repository indexed. Ask me anything about the codebase.`,
        sources: [],
      }])
      inputRef.current?.focus()
    }
  }, [repoUrl])

  async function handleSend() {
    const q = input.trim()
    if (!q || loading) return
    setInput('')
    setError('')
    setMessages(prev => [...prev, { role: 'user', content: q, sources: [] }])
    setLoading(true)
    try {
      const data = await chat(q)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.answer,
        sources: data.sources,
      }])
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  if (!repoUrl) return (
    <div className="flex-1 flex items-center justify-center text-terminal-muted text-sm">
      <div className="text-center space-y-2">
        <div className="text-3xl opacity-30">⬆</div>
        <div>index a repository to begin</div>
      </div>
    </div>
  )

  return (
    <div className="flex-1 flex flex-col min-h-0 border border-terminal-border rounded-lg bg-terminal-surface overflow-hidden">
      {/* Repo label */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-terminal-border bg-terminal-bg">
        <span className="w-2 h-2 rounded-full bg-terminal-green animate-pulse-green inline-block"/>
        <span className="text-xs text-terminal-muted font-mono truncate">{repoUrl}</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((msg, i) => (
          <ChatMessage key={i} message={msg} />
        ))}
        {loading && <TypingIndicator />}
        {error && (
          <div className="text-terminal-red text-xs flex items-center gap-2 animate-fadeIn">
            <span>✗</span><span>{error}</span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-terminal-border p-3 bg-terminal-bg">
        <div className="flex gap-2 items-center">
          <span className="text-terminal-green text-sm font-display select-none">❯</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="ask a question about the repository..."
            disabled={loading}
            className="flex-1 bg-transparent text-sm text-terminal-text placeholder-terminal-muted
                       focus:outline-none disabled:opacity-50"
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="px-3 py-1.5 border border-terminal-green/40 text-terminal-green text-xs
                       rounded hover:bg-terminal-green hover:text-terminal-bg
                       disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150"
          >
            send
          </button>
        </div>
      </div>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex gap-3 animate-fadeIn">
      <div className="w-7 h-7 rounded bg-terminal-border border border-terminal-green/30 flex items-center justify-center text-xs text-terminal-green font-display">
        AI
      </div>
      <div className="bg-terminal-surface border border-terminal-border rounded-lg px-4 py-3 flex items-center gap-1.5">
        {[0, 150, 300].map(d => (
          <span key={d}
            className="w-1.5 h-1.5 rounded-full bg-terminal-green animate-bounce"
            style={{ animationDelay: `${d}ms` }}
          />
        ))}
      </div>
    </div>
  )
}

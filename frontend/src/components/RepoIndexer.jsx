import { useState } from 'react'
import { indexRepo } from '../api'

export default function RepoIndexer({ onIndexed }) {
  const [url, setUrl] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [message, setMessage] = useState('')

  async function handleIndex() {
    if (!url.trim()) return
    setStatus('loading')
    setMessage('')
    try {
      const data = await indexRepo(url.trim())
      setStatus('success')
      setMessage(`${data.files_indexed} chunks indexed`)
      onIndexed(url.trim())
    } catch (e) {
      setStatus('error')
      setMessage(e.message)
    }
  }

  return (
    <div className="border border-terminal-border bg-terminal-surface rounded-lg p-5 green-glow">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-terminal-green font-display text-xs tracking-widest uppercase">
          $ init repository
        </span>
        <span className="animate-blink text-terminal-green">▋</span>
      </div>

      {/* Input row */}
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-terminal-muted text-xs">~/</span>
          <input
            type="text"
            value={url}
            onChange={e => setUrl(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleIndex()}
            placeholder="github.com/owner/repo"
            className="w-full bg-terminal-bg border border-terminal-border rounded pl-8 pr-3 py-2.5
                       text-sm text-terminal-text placeholder-terminal-muted
                       focus:outline-none focus:border-terminal-green focus:shadow-[0_0_10px_rgba(0,255,136,0.15)]
                       transition-all duration-200"
          />
        </div>
        <button
          onClick={handleIndex}
          disabled={status === 'loading' || !url.trim()}
          className="px-4 py-2.5 bg-terminal-green text-terminal-bg font-mono text-sm font-semibold
                     rounded hover:bg-terminal-green-dim active:scale-95
                     disabled:opacity-40 disabled:cursor-not-allowed
                     transition-all duration-150 whitespace-nowrap"
        >
          {status === 'loading' ? (
            <span className="flex items-center gap-2">
              <Spinner /> indexing...
            </span>
          ) : '[ index ]'}
        </button>
      </div>

      {/* Status */}
      {message && (
        <div className={`mt-3 text-xs flex items-center gap-2 animate-fadeIn ${
          status === 'success' ? 'text-terminal-green' : 'text-terminal-red'
        }`}>
          <span>{status === 'success' ? '✓' : '✗'}</span>
          <span>{status === 'success' ? `ready — ${message}` : `error: ${message}`}</span>
        </div>
      )}
    </div>
  )
}

function Spinner() {
  return (
    <svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
    </svg>
  )
}

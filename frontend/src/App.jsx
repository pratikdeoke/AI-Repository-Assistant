import { useState } from 'react'
import RepoIndexer from './components/RepoIndexer'
import ChatInterface from './components/ChatInterface'

export default function App() {
  const [indexedRepo, setIndexedRepo] = useState(null)

  return (
    <div className="min-h-screen bg-terminal-bg flex flex-col">
      {/* Header */}
      <header className="border-b border-terminal-border px-6 py-3 flex items-center gap-3">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-terminal-red/70"/>
          <span className="w-3 h-3 rounded-full bg-terminal-amber/70"/>
          <span className="w-3 h-3 rounded-full bg-terminal-green/70"/>
        </div>
        <span className="text-terminal-muted text-xs font-display tracking-widest ml-2">
          AI-REPO-ASSISTANT
        </span>
        <span className="ml-auto text-terminal-muted/50 text-xs">v1.0.0</span>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col max-w-4xl w-full mx-auto px-4 py-6 gap-4">
        {/* Title */}
        <div className="mb-2">
          <h1 className="font-display text-terminal-green text-xl text-glow tracking-wider">
            $ repository_assistant<span className="animate-blink">▋</span>
          </h1>
          <p className="text-terminal-text-dim text-xs mt-1">
            index any github repo · ask questions · get answers with source references
          </p>
        </div>

        <RepoIndexer onIndexed={setIndexedRepo} />
        <ChatInterface repoUrl={indexedRepo} />
      </main>
    </div>
  )
}

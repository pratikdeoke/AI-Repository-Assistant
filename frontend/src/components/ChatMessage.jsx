export default function ChatMessage({ message }) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex gap-3 animate-slideUp ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      <div className={`flex-shrink-0 w-7 h-7 rounded flex items-center justify-center text-xs font-display
        ${isUser
          ? 'bg-terminal-green text-terminal-bg'
          : 'bg-terminal-border text-terminal-green border border-terminal-green/30'
        }`}>
        {isUser ? 'U' : 'AI'}
      </div>

      {/* Bubble */}
      <div className={`max-w-[80%] ${isUser ? 'items-end' : 'items-start'} flex flex-col gap-1.5`}>
        <div className={`rounded-lg px-4 py-3 text-sm leading-relaxed prose-terminal
          ${isUser
            ? 'bg-terminal-green/10 border border-terminal-green/20 text-terminal-text'
            : 'bg-terminal-surface border border-terminal-border text-terminal-text'
          }`}>
          {message.content}
        </div>

        {/* Sources */}
        {message.sources?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-1">
            {message.sources.map((src, i) => (
              <span key={i}
                className="text-xs px-2 py-0.5 bg-terminal-bg border border-terminal-green/20
                           text-terminal-green/70 rounded font-mono truncate max-w-[200px]"
                title={src}>
                📄 {src}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

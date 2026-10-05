import { useState, useEffect } from 'react';

interface EmojiReactionsProps {
  calloutId: string;
}

const EMOJIS = ['🔥', '🚀', '💎', '😂', '😱', '👍'];

export default function EmojiReactions({ calloutId }: EmojiReactionsProps) {
  const [reactions, setReactions] = useState<Record<string, number>>({});
  const [userReactions, setUserReactions] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(`reactions_${calloutId}`);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setReactions(parsed.counts || {});
        setUserReactions(parsed.user || []);
      } catch {}
    }
  }, [calloutId]);

  const handleReact = (emoji: string) => {
    const hasReacted = userReactions.includes(emoji);
    const newCounts = { ...reactions };
    const newUser = hasReacted ? userReactions.filter(e => e !== emoji) : [...userReactions, emoji];

    if (hasReacted) {
      newCounts[emoji] = Math.max((newCounts[emoji] || 1) - 1, 0);
      if (newCounts[emoji] === 0) delete newCounts[emoji];
    } else {
      newCounts[emoji] = (newCounts[emoji] || 0) + 1;
    }

    setReactions(newCounts);
    setUserReactions(newUser);
    localStorage.setItem(`reactions_${calloutId}`, JSON.stringify({ counts: newCounts, user: newUser }));
  };

  return (
    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '8px' }}>
      {EMOJIS.map(emoji => {
        const count = reactions[emoji] || 0;
        const active = userReactions.includes(emoji);
        return (
          <button key={emoji} onClick={() => handleReact(emoji)} style={{
            background: active ? '#1a2e1f' : '#141414',
            border: active ? '1px solid #4ade80' : '1px solid #2a2a2a',
            borderRadius: '999px',
            padding: '4px 10px',
            fontSize: '13px',
            cursor: 'pointer',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}>
            <span>{emoji}</span>
            {count > 0 && <span style={{ fontSize: '11px', color: active ? '#4ade80' : '#888' }}>{count}</span>}
          </button>
        );
      })}
    </div>
  );
}

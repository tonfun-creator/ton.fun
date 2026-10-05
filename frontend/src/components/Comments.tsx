import { useState } from 'react';
import { useComments } from '../hooks/useComments';

interface CommentsProps {
  tokenAddress: string;
}

export default function Comments({ tokenAddress }: CommentsProps) {
  const { comments, addComment } = useComments(tokenAddress);
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (!text.trim()) return;
    addComment('You', '😎', text.trim());
    setText('');
  };

  const formatTime = (ts: number) => {
    const diff = Date.now() - ts;
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div style={{ padding: '16px' }}>
      {/* Input */}
      <div style={{
        background: '#141414',
        border: '1px solid #2a2a2a',
        borderRadius: '12px',
        padding: '10px',
        marginBottom: '16px',
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
      }}>
        <input
          type="text"
          placeholder="Add a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            color: '#fff',
            fontSize: '14px',
            outline: 'none',
            padding: '6px',
          }}
        />
        <button
          onClick={handleSubmit}
          style={{
            background: text.trim() ? '#4ade80' : '#2a2a2a',
            color: text.trim() ? '#0a0a0a' : '#666',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 14px',
            fontWeight: 700,
            fontSize: '13px',
            cursor: 'pointer',
          }}
        >
          Post
        </button>
      </div>

      {/* Comments List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {comments.map(c => (
          <div key={c.id} style={{
            background: '#141414',
            border: '1px solid #2a2a2a',
            borderRadius: '12px',
            padding: '12px',
            display: 'flex',
            gap: '10px',
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: '#1a1a1a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              flexShrink: 0,
            }}>
              {c.avatar}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                <strong style={{ fontSize: '13px', color: '#fff' }}>{c.user}</strong>
                {c.isVerified && <span style={{ color: '#4ade80', fontSize: '11px' }}>✓</span>}
                <span style={{ fontSize: '11px', color: '#666', marginLeft: 'auto' }}>
                  {formatTime(c.timestamp)}
                </span>
              </div>
              <p style={{ fontSize: '13px', color: '#ddd', lineHeight: 1.4, margin: 0 }}>
                {c.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

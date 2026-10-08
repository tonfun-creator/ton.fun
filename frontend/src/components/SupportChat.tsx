import { useState } from 'react';

export default function SupportChat() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ from: 'user' | 'bot'; text: string; time: number }[]>([
    { from: 'bot', text: 'Hi! 👋 Welcome to ton.fun support. How can we help you today?', time: Date.now() },
  ]);

  const send = () => {
    if (!message.trim()) return;
    const userMsg = { from: 'user' as const, text: message, time: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setMessage('');

    setTimeout(() => {
      const responses = [
        'Thanks! Our team will respond within 24 hours.',
        'For urgent issues, join our Telegram group: t.me/tonfun_officialBot',
        'Please describe your issue in more detail.',
        'We have received your message. ✅',
      ];
      const reply = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, { from: 'bot', text: reply, time: Date.now() }]);
    }, 1000);
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: 'fixed',
          bottom: '100px',
          right: '20px',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: '#4ade80',
          color: '#0a0a0a',
          border: '2px solid #0a0a0a',
          fontSize: '24px',
          cursor: 'pointer',
          zIndex: 400,
          boxShadow: '0 4px 12px rgba(74,222,128,0.4)',
        }}
      >
        {open ? '×' : '💬'}
      </button>

      {open && (
        <div style={{
          position: 'fixed',
          bottom: '170px',
          right: '20px',
          width: 'calc(100% - 40px)',
          maxWidth: '360px',
          height: '450px',
          background: '#0a0a0a',
          border: '2px solid #2a2a2a',
          borderRadius: '16px',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 400,
          overflow: 'hidden',
        }}>
          <div style={{
            padding: '14px 16px',
            background: '#141414',
            borderBottom: '1px solid #2a2a2a',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80' }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#fff' }}>Support</div>
              <div style={{ fontSize: '11px', color: '#4ade80' }}>Online</div>
            </div>
          </div>

          <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {messages.map((m, i) => (
              <div key={i} style={{
                alignSelf: m.from === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '80%',
                background: m.from === 'user' ? '#4ade80' : '#1a1a1a',
                color: m.from === 'user' ? '#0a0a0a' : '#fff',
                padding: '10px 14px',
                borderRadius: '14px',
                fontSize: '13px',
                lineHeight: 1.4,
              }}>
                {m.text}
              </div>
            ))}
          </div>

          <div style={{ padding: '12px', borderTop: '1px solid #2a2a2a', display: 'flex', gap: '8px' }}>
            <input
              type="text"
              placeholder="Type message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              style={{
                flex: 1,
                background: '#141414',
                border: '1px solid #2a2a2a',
                borderRadius: '10px',
                padding: '10px 14px',
                color: '#fff',
                fontSize: '13px',
                outline: 'none',
              }}
            />
            <button
              onClick={send}
              style={{
                background: '#4ade80',
                color: '#0a0a0a',
                border: 'none',
                borderRadius: '10px',
                padding: '10px 16px',
                fontWeight: 800,
                fontSize: '13px',
                cursor: 'pointer',
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

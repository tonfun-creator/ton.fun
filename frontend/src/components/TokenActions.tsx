import { useState } from 'react';

interface TokenActionsProps {
  address: string;
  name: string;
}

export default function TokenActions({ address, name }: TokenActionsProps) {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert('Copy nahi hua');
    }
  };

  const handleShare = async () => {
    const text = `Check out ${name} on ton.fun!`;
    const url = `https://ton-fun.vercel.app/token/${address}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: name, text, url });
      } catch {}
    } else {
      await navigator.clipboard.writeText(`${text} ${url}`);
      alert('Link copied!');
    }
  };

  return (
    <>
      <div style={{ display: 'flex', gap: '6px' }}>
        <button onClick={handleCopy} style={btnStyle}>{copied ? '✅' : '📋'}</button>
        <button onClick={handleShare} style={btnStyle}>↗</button>
        <button onClick={() => setShowQR(true)} style={btnStyle}>⬛</button>
      </div>

      {showQR && (
        <div style={modalOverlay} onClick={() => setShowQR(false)}>
          <div style={modalBox} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ marginBottom: '16px', fontSize: '16px' }}>Scan to open</h3>
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://ton-fun.vercel.app/token/${address}`}
              alt="QR"
              style={{ width: '200px', height: '200px', borderRadius: '10px' }}
            />
            <p style={{ fontSize: '11px', color: '#666', marginTop: '12px', wordBreak: 'break-all' }}>{address}</p>
            <button onClick={() => setShowQR(false)} style={{ ...btnStyle, marginTop: '16px', padding: '10px 20px', width: 'auto', height: 'auto' }}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}

const btnStyle: React.CSSProperties = {
  background: '#1a1a1a',
  border: '1px solid #2a2a2a',
  color: '#fff',
  width: '34px',
  height: '34px',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '14px',
};

const modalOverlay: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(0,0,0,0.8)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
  padding: '20px',
};

const modalBox: React.CSSProperties = {
  background: '#141414',
  border: '1px solid #2a2a2a',
  borderRadius: '16px',
  padding: '24px',
  textAlign: 'center',
  color: '#fff',
  maxWidth: '320px',
};

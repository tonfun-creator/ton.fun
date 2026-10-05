import { useState } from 'react';
import { useTonAddress } from '@tonconnect/ui-react';

export default function Create() {
// Line ko comment kar dein
// const [tonConnectUI] = useTonConnectUI();
  const userAddress = useTonAddress();
  const [name, setName] = useState('');
  const [ticker, setTicker] = useState('');

  const handleSubmit = () => {
    if (!userAddress) {
      alert('Pehle wallet connect karein');
      return;
    }
    alert(`Name: ${name}, Ticker: ${ticker}, Address: ${userAddress}`);
  };

  return (
    <div className="create-page">
      <div className="create-header">
        <h1 className="create-title">Create a coin</h1>
      </div>

      {!userAddress && (
        <div style={{
          background: '#3a1b1b',
          border: '1px solid #ef4444',
          borderRadius: '10px',
          padding: '12px',
          marginBottom: '16px',
          color: '#ffaaaa',
          fontSize: '13px',
        }}>
          ⚠️ Pehle wallet connect karein
        </div>
      )}

      <div className="create-section">
        <label className="create-label">Name</label>
        <input
          type="text"
          className="create-input"
          placeholder="Enter coin name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="create-section">
        <label className="create-label">Ticker</label>
        <input
          type="text"
          className="create-input"
          placeholder="Add a coin ticker"
          value={ticker}
          onChange={(e) => setTicker(e.target.value.toUpperCase())}
        />
      </div>

      <button className="create-next-btn" onClick={handleSubmit}>
        Test Button
      </button>
    </div>
  );
}

import { useState } from 'react';

export default function Create() {
  const [name, setName] = useState('');
  const [ticker, setTicker] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (!name || !ticker) {
      alert('Name aur Ticker zaroori hain');
      return;
    }
    alert(`Token: ${name} (${ticker})`);
  };

  return (
    <div className="create-page">
      <div className="create-header">
        <h1 className="create-title">Create a coin</h1>
      </div>

      <div className="create-section">
        <label className="create-label">Name</label>
        <input type="text" className="create-input" placeholder="Enter coin name" value={name} onChange={(e) => setName(e.target.value)} maxLength={32} />
      </div>

      <div className="create-section">
        <label className="create-label">Ticker</label>
        <input type="text" className="create-input" placeholder="e.g. DOGE" value={ticker} onChange={(e) => setTicker(e.target.value.toUpperCase())} maxLength={10} />
      </div>

      <div className="create-section">
        <label className="create-label">Description <span className="optional">Optional</span></label>
        <textarea className="create-textarea" placeholder="Enter coin description" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
      </div>

      <button className="create-next-btn" onClick={handleSubmit}>
        🚀 Create Token (1.5 TON)
      </button>

      <p className="create-footer-note">Coin data cannot be changed after creation.</p>
    </div>
  );
}

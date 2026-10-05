import { useState } from 'react';

export default function Create() {
  const [name, setName] = useState('');
  const [ticker, setTicker] = useState('');

  const handleSubmit = () => {
    alert(`Name: ${name}, Ticker: ${ticker}`);
  };

  return (
    <div className="create-page">
      <div className="create-header">
        <h1 className="create-title">Create a coin</h1>
      </div>

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


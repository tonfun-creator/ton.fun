import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTonConnectUI, useTonAddress } from '@tonconnect/ui-react';
import { toNano } from '@ton/core';
import { CONTRACTS, CREATION_FEE, MIN_FIRST_BUY, buildCreateTokenBody } from '../lib/contracts';

export default function Create() {
  const navigate = useNavigate();
  const [tonConnectUI] = useTonConnectUI();
  const userAddress = useTonAddress();

  const [name, setName] = useState('');
  const [ticker, setTicker] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!userAddress) {
      alert('Pehle wallet connect karein');
      return;
    }
    if (!name || !ticker) {
      alert('Name aur Ticker zaroori hain');
      return;
    }

    setLoading(true);
    try {
      const totalValue = CREATION_FEE + MIN_FIRST_BUY + toNano('0.1');
      const body = buildCreateTokenBody(name, ticker);

      const transaction = {
        validUntil: Math.floor(Date.now() / 1000) + 360,
        messages: [
          {
            address: CONTRACTS.tokenFactory,
            amount: totalValue.toString(),
            payload: body.toBoc().toString('base64'),
          },
        ],
      };

      await tonConnectUI.sendTransaction(transaction);
      alert('✅ Transaction bheja gaya! Token create ho raha hai...');
      setTimeout(() => navigate('/'), 3000);
    } catch (err: any) {
      console.error(err);
      alert('❌ Error: ' + (err.message || 'Transaction failed'));
    } finally {
      setLoading(false);
    }
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
          fontWeight: 600
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
          maxLength={32}
        />
      </div>

      <div className="create-section">
        <label className="create-label">Ticker</label>
        <input
          type="text"
          className="create-input"
          placeholder="Add a coin ticker (e.g. DOGE)"
          value={ticker}
          onChange={(e) => setTicker(e.target.value.toUpperCase())}
          maxLength={10}
        />
      </div>

      <div className="create-section">
        <label className="create-label">
          Description <span className="optional">Optional</span>
        </label>
        <textarea
          className="create-textarea"
          placeholder="Enter coin description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={200}
          rows={3}
        />
      </div>

      <div style={{
        background: '#1a1a1a',
        border: '1px solid #2a2a2a',
        borderRadius: '10px',
        padding: '14px',
        marginBottom: '16px',
        fontSize: '13px',
        color: '#aaa'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span>Creation fee</span>
          <span style={{ color: '#fff', fontWeight: 700 }}>1 TON</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span>Minimum first buy</span>
          <span style={{ color: '#fff', fontWeight: 700 }}>0.5 TON</span>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          borderTop: '1px solid #2a2a2a',
          paddingTop: '8px'
        }}>
          <span style={{ fontWeight: 700 }}>Total</span>
          <span style={{ color: '#4ade80', fontWeight: 900 }}>1.5 TON</span>
        </div>
      </div>

      <button
        className="create-next-btn"
        onClick={handleSubmit}
        disabled={loading || !userAddress}
      >
        {loading
          ? '⏳ Creating...'
          : !userAddress
          ? 'Connect Wallet First'
          : '🚀 Create Token (1.5 TON)'}
      </button>

      <p className="create-footer-note">
        Coin data cannot be changed after creation.
      </p>
    </div>
  );
}




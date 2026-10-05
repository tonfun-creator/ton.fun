import { useState } from 'react';

type PoolPair = 'TON' | 'USDT' | 'custom';
type RewardsTo = 'creator' | 'holders';
type MayhemMode = 'classic' | 'trigger' | 'party';

export default function Create() {
  const [name, setName] = useState('');
  const [ticker, setTicker] = useState('');
  const [description, setDescription] = useState('');
  const [poolPair, setPoolPair] = useState<PoolPair>('TON');
  const [socials, setSocials] = useState({ twitter: '', telegram: '', website: '' });
  const [showSocials, setShowSocials] = useState(false);
  const [rewardsTo, setRewardsTo] = useState<RewardsTo>('creator');
  const [mayhemEnabled, setMayhemEnabled] = useState(false);
  const [mayhemMode, setMayhemMode] = useState<MayhemMode>('classic');

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

      {/* Name */}
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

      {/* Ticker */}
      <div className="create-section">
        <label className="create-label">Ticker</label>
        <input
          type="text"
          className="create-input"
          placeholder="e.g. DOGE"
          value={ticker}
          onChange={(e) => setTicker(e.target.value.toUpperCase())}
          maxLength={10}
        />
      </div>

      {/* Description */}
      <div className="create-section">
        <label className="create-label">
          Description <span className="optional">Optional</span>
        </label>
        <textarea
          className="create-textarea"
          placeholder="Enter coin description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </div>

      {/* Pool Pair */}
      <div className="create-section">
        <label className="create-label">Pool pair</label>
        <div className="pool-pair-grid">
          <button
            className={`pool-pair-btn ${poolPair === 'TON' ? 'active' : ''}`}
            onClick={() => setPoolPair('TON')}
          >
            <div className="pool-icon pool-ton">💎</div>
            <span>TON</span>
          </button>
          <button
            className={`pool-pair-btn ${poolPair === 'USDT' ? 'active' : ''}`}
            onClick={() => setPoolPair('USDT')}
          >
            <div className="pool-icon pool-usdt">$</div>
            <span>USDT</span>
          </button>
          <button
            className={`pool-pair-btn ${poolPair === 'custom' ? 'active' : ''}`}
            onClick={() => setPoolPair('custom')}
          >
            <div className="pool-icon pool-custom">⚙️</div>
            <span>Custom</span>
          </button>
        </div>
      </div>

      {/* Social Links */}
      <div className="create-section">
        <div
          className="social-header"
          onClick={() => setShowSocials(!showSocials)}
          style={{ cursor: 'pointer' }}
        >
          <div>
            <div className="create-label" style={{ marginBottom: 0 }}>
              Social links
            </div>
            <div className="optional">Optional</div>
          </div>
          <div style={{ transform: showSocials ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        {showSocials && (
          <div style={{ marginTop: '12px' }}>
            <input
              type="text"
              className="create-input"
              placeholder="Twitter / X URL"
              value={socials.twitter}
              onChange={(e) => setSocials({ ...socials, twitter: e.target.value })}
              style={{ marginBottom: '8px' }}
            />
            <input
              type="text"
              className="create-input"
              placeholder="Telegram URL"
              value={socials.telegram}
              onChange={(e) => setSocials({ ...socials, telegram: e.target.value })}
              style={{ marginBottom: '8px' }}
            />
            <input
              type="text"
              className="create-input"
              placeholder="Website URL"
              value={socials.website}
              onChange={(e) => setSocials({ ...socials, website: e.target.value })}
            />
          </div>
        )}
      </div>

      {/* Rewards */}
      <div className="create-section">
        <label className="create-label">Send creator rewards to:</label>
        <div className="rewards-toggle">
          <button
            className={`rewards-btn ${rewardsTo === 'creator' ? 'active' : ''}`}
            onClick={() => setRewardsTo('creator')}
          >
            👨‍🍳 Creator
          </button>
          <button
            className={`rewards-btn ${rewardsTo === 'holders' ? 'active' : ''}`}
            onClick={() => setRewardsTo('holders')}
          >
            👥 Holders
          </button>
        </div>
      </div>

      {/* Mayhem Mode */}
      <div className="mayhem-card">
        <div className="mayhem-header">
          <div className="mayhem-icon">〰️</div>
          <div className="mayhem-text">
            <div className="mayhem-title">Mayhem Mode</div>
            <div className="mayhem-subtitle">Agent is randomly transacting!</div>
          </div>
          <button
            className={`switch ${mayhemEnabled ? 'on' : 'off'}`}
            onClick={() => setMayhemEnabled(!mayhemEnabled)}
          >
            <span className="switch-knob" />
          </button>
        </div>

        {mayhemEnabled && (
          <>
            <div style={{
              marginTop: '12px',
              marginBottom: '8px',
              fontWeight: 700,
              color: '#fff',
              fontSize: '13px',
            }}>
              Mayhem agent mode
            </div>
            <div className="mayhem-modes">
              <button
                className={`mayhem-mode-btn ${mayhemMode === 'classic' ? 'active' : ''}`}
                onClick={() => setMayhemMode('classic')}
              >
                〰️ Classic
              </button>
              <button
                className={`mayhem-mode-btn ${mayhemMode === 'trigger' ? 'active' : ''}`}
                onClick={() => setMayhemMode('trigger')}
              >
                🎯 Trigger
              </button>
              <button
                className={`mayhem-mode-btn ${mayhemMode === 'party' ? 'active' : ''}`}
                onClick={() => setMayhemMode('party')}
              >
                🎉 Party
              </button>
            </div>
            <p className="create-hint" style={{ marginTop: '12px' }}>
              {mayhemMode === 'classic' && 'The Mayhem agent randomly enters and exits the coin automatically. Mode cannot be changed after creation.'}
              {mayhemMode === 'trigger' && 'The Mayhem agent only executes a transaction when prompted by the coin creator.'}
              {mayhemMode === 'party' && 'In Party, anyone can trigger the agent if they hold enough of the coin\'s supply.'}
            </p>
          </>
        )}

        <p className="create-hint" style={{ marginTop: '12px' }}>
          Activates anytime for 24h, set at creation. <span style={{ color: '#4ade80' }}>Read disclaimer</span>
        </p>
      </div>

      {/* Fee Info */}
      <div style={{
        background: '#1a1a1a',
        border: '1px solid #2a2a2a',
        borderRadius: '10px',
        padding: '14px',
        marginBottom: '16px',
        fontSize: '13px',
        color: '#aaa',
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
          paddingTop: '8px',
        }}>
          <span style={{ fontWeight: 700 }}>Total</span>
          <span style={{ color: '#4ade80', fontWeight: 900 }}>1.5 TON</span>
        </div>
      </div>

      <button className="create-next-btn" onClick={handleSubmit}>
        🚀 Create Token (1.5 TON)
      </button>

      <p className="create-footer-note">Coin data cannot be changed after creation.</p>
    </div>
  );
}

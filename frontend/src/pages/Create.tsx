import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type PoolPair = 'TON' | 'USDT' | 'custom';
type RewardsTo = 'creator' | 'holders';
type MayhemMode = 'classic' | 'trigger' | 'party';

export default function Create() {
  const navigate = useNavigate();

  // Form state
  const [image, setImage] = useState<string>('');
  const [name, setName] = useState('');
  const [ticker, setTicker] = useState('');
  const [description, setDescription] = useState('');
  const [poolPair, setPoolPair] = useState<PoolPair>('TON');
  const [socials, setSocials] = useState({ twitter: '', telegram: '', website: '' });
  const [rewardsTo, setRewardsTo] = useState<RewardsTo>('creator');
  const [mayhemEnabled, setMayhemEnabled] = useState(false);
  const [mayhemMode, setMayhemMode] = useState<MayhemMode>('classic');
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!name || !ticker) {
      alert('Name aur Ticker zaroori hain');
      return;
    }
    setLoading(true);
    try {
      // TODO: Contract se connect karke token create karo
      console.log('Creating token:', {
        name, ticker, description, poolPair, socials, rewardsTo, mayhemEnabled, mayhemMode
      });
      alert('Token create request bheja gaya (demo)');
      navigate('/');
    } catch (err) {
      alert('Error: ' + err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-page">
      <div className="create-header">
        <h1 className="create-title">Create a coin</h1>
      </div>

      {/* ===== Media Upload ===== */}
      <div className="create-section">
        <label className="create-label">Media</label>
        <div className="media-upload">
          {image ? (
            <img src={image} alt="Token" className="media-preview" />
          ) : (
            <div className="media-placeholder">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <path d="M4 4h16v16H4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                <circle cx="9" cy="9" r="2" fill="currentColor"/>
                <path d="M4 16l5-5 4 4 3-3 4 4" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
              </svg>
              <p>Upload image or video</p>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="media-input"
            id="media-upload"
          />
          <label htmlFor="media-upload" className="media-overlay">
            {image ? 'Change media' : ''}
          </label>
        </div>
      </div>

      {/* ===== Name ===== */}
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

      {/* ===== Ticker ===== */}
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

      {/* ===== Description ===== */}
      <div className="create-section">
        <label className="create-label">Description <span className="optional">Optional</span></label>
        <textarea
          className="create-textarea"
          placeholder="Enter coin description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={200}
          rows={3}
        />
      </div>

      {/* ===== Pool Pair ===== */}
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

      {/* ===== Social Links ===== */}
      <div className="create-section">
        <div className="social-header">
          <div>
            <div className="create-label" style={{ marginBottom: 0 }}>Social links</div>
            <div className="optional">Optional</div>
          </div>
          <button
            className="social-toggle"
            onClick={() => {
              const el = document.getElementById('social-inputs');
              if (el) el.style.display = el.style.display === 'none' ? 'block' : 'none';
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <div id="social-inputs" style={{ display: 'none', marginTop: '12px' }}>
          <input
            type="text"
            className="create-input"
            placeholder="Twitter URL"
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
      </div>

      {/* ===== Creator Rewards ===== */}
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
        <p className="create-hint">
          Creator rewards can be shared with wallets or charities from the coin page after your coin has been created.
        </p>
      </div>

      {/* ===== Mayhem Mode ===== */}
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
            <div className="mayhem-subtitle" style={{ marginTop: '12px', marginBottom: '8px', fontWeight: 700 }}>
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
              {mayhemMode === 'trigger' && 'The Mayhem agent only executes a transaction when prompted by the coin creator. Mode cannot be changed after creation.'}
              {mayhemMode === 'party' && 'In Party, anyone can trigger the agent if they hold enough of the coin\'s supply.'}
            </p>
          </>
        )}

        <p className="create-hint" style={{ marginTop: '12px' }}>
          Activates anytime for 24h, set at creation. <span style={{ color: '#4ade80' }}>Read disclaimer</span>
        </p>
      </div>

      {/* ===== Next Button ===== */}
      <button className="create-next-btn" onClick={handleSubmit} disabled={loading}>
        {loading ? 'Creating...' : 'Next'}
      </button>

      <p className="create-footer-note">
        Coin data cannot be changed after creation.
      </p>
    </div>
  );
}

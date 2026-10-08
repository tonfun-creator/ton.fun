import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toNano } from '@ton/core';
import Confetti from '../components/Confetti';
import RewardToast from '../components/RewardToast';
import { useRewards } from '../hooks/useRewards';
import { useWallet } from '../hooks/useWallet';
import { CONTRACTS, CREATION_FEE, MIN_FIRST_BUY, buildCreateTokenBody } from '../lib/contracts';

type PoolPair = 'TON' | 'USDT' | 'custom';
type RewardsTo = 'creator' | 'holders';
type MayhemMode = 'classic' | 'trigger' | 'party';

export default function Create() {
  const navigate = useNavigate();
  const { addReward } = useRewards();
  const { isConnected, sendTransaction } = useWallet();

  const [name, setName] = useState('');
  const [ticker, setTicker] = useState('');
  const [description, setDescription] = useState('');
  const [poolPair, setPoolPair] = useState<PoolPair>('TON');
  const [socials, setSocials] = useState({ twitter: '', telegram: '', website: '' });
  const [showSocials, setShowSocials] = useState(false);
  const [rewardsTo, setRewardsTo] = useState<RewardsTo>('creator');
  const [mayhemEnabled, setMayhemEnabled] = useState(false);
  const [mayhemMode, setMayhemMode] = useState<MayhemMode>('classic');
  const [showConfetti, setShowConfetti] = useState(false);
  const [rewardShow, setRewardShow] = useState(false);
  const [rewardCoins, setRewardCoins] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!isConnected) {
      alert('Pehle wallet connect karein');
      return;
    }
    if (!name || !ticker) {
      alert('Name aur Ticker zaroori hain');
      return;
    }

    setLoading(true);
    try {
      // Total value: 1 TON + 0.5 TON + 0.1 TON gas
      const totalValue = (CREATION_FEE + MIN_FIRST_BUY + toNano('0.1')).toString();
      const body = buildCreateTokenBody(name, ticker);
      const payload = body.toBoc().toString('base64');

      await sendTransaction(CONTRACTS.tokenFactory, totalValue, payload);

      // Success
      setShowConfetti(true);
      addReward('token_create', 10000, `Created ${name} (${ticker})`);
      setRewardCoins(10000);
      setRewardShow(true);

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
      <Confetti active={showConfetti} onComplete={() => setShowConfetti(false)} />
      <RewardToast coins={rewardCoins} message="Token created!" show={rewardShow} onComplete={() => setRewardShow(false)} />

      <div className="create-header">
        <h1 className="create-title">Create a coin</h1>
      </div>

      {!isConnected && (
        <div style={{
          background: 'rgba(255,93,108,0.15)',
          border: '3px solid var(--down)',
          borderRadius: '12px',
          padding: '14px',
          marginBottom: '16px',
          color: 'var(--down)',
          fontSize: '13px',
          fontWeight: 600,
          fontFamily: 'var(--font-display)',
        }}>
          ⚠️ Wallet connect karein token create karne ke liye
        </div>
      )}

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

      <div className="create-section">
        <label className="create-label">Pool pair</label>
        <div className="pool-pair-grid">
          <button className={`pool-pair-btn ${poolPair === 'TON' ? 'active' : ''}`} onClick={() => setPoolPair('TON')}>
            <div className="pool-icon pool-ton">💎</div>
            <span>TON</span>
          </button>
          <button className={`pool-pair-btn ${poolPair === 'USDT' ? 'active' : ''}`} onClick={() => setPoolPair('USDT')}>
            <div className="pool-icon pool-usdt">$</div>
            <span>USDT</span>
          </button>
          <button className={`pool-pair-btn ${poolPair === 'custom' ? 'active' : ''}`} onClick={() => setPoolPair('custom')}>
            <div className="pool-icon pool-custom">⚙️</div>
            <span>Custom</span>
          </button>
        </div>
      </div>

      <div className="create-section">
        <div className="social-header" onClick={() => setShowSocials(!showSocials)} style={{ cursor: 'pointer' }}>
          <div>
            <div className="create-label" style={{ marginBottom: 0 }}>Social links</div>
            <div className="optional">Optional</div>
          </div>
          <div style={{ transform: showSocials ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s', color: 'var(--muted)' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        {showSocials && (
          <div style={{ marginTop: '12px' }}>
            <input type="text" className="create-input" placeholder="Twitter / X URL" value={socials.twitter} onChange={(e) => setSocials({ ...socials, twitter: e.target.value })} style={{ marginBottom: '8px' }} />
            <input type="text" className="create-input" placeholder="Telegram URL" value={socials.telegram} onChange={(e) => setSocials({ ...socials, telegram: e.target.value })} style={{ marginBottom: '8px' }} />
            <input type="text" className="create-input" placeholder="Website URL" value={socials.website} onChange={(e) => setSocials({ ...socials, website: e.target.value })} />
          </div>
        )}
      </div>

      <div className="create-section">
        <label className="create-label">Send creator rewards to</label>
        <div className="rewards-toggle">
          <button className={`rewards-btn ${rewardsTo === 'creator' ? 'active' : ''}`} onClick={() => setRewardsTo('creator')}>👨‍🍳 Creator</button>
          <button className={`rewards-btn ${rewardsTo === 'holders' ? 'active' : ''}`} onClick={() => setRewardsTo('holders')}>👥 Holders</button>
        </div>
      </div>

      <div className="mayhem-card">
        <div className="mayhem-header">
          <div className="mayhem-icon">〰️</div>
          <div className="mayhem-text">
            <div className="mayhem-title">Mayhem Mode</div>
            <div className="mayhem-subtitle">Agent is randomly transacting!</div>
          </div>
          <button className={`switch ${mayhemEnabled ? 'on' : 'off'}`} onClick={() => setMayhemEnabled(!mayhemEnabled)}>
            <span className="switch-knob" />
          </button>
        </div>

        {mayhemEnabled && (
          <>
            <div className="create-label" style={{ marginTop: '14px', marginBottom: '8px' }}>Mayhem agent mode</div>
            <div className="mayhem-modes">
              <button className={`mayhem-mode-btn ${mayhemMode === 'classic' ? 'active' : ''}`} onClick={() => setMayhemMode('classic')}>〰️ Classic</button>
              <button className={`mayhem-mode-btn ${mayhemMode === 'trigger' ? 'active' : ''}`} onClick={() => setMayhemMode('trigger')}>🎯 Trigger</button>
              <button className={`mayhem-mode-btn ${mayhemMode === 'party' ? 'active' : ''}`} onClick={() => setMayhemMode('party')}>🎉 Party</button>
            </div>
            <p className="create-hint">
              {mayhemMode === 'classic' && 'The Mayhem agent randomly enters and exits the coin automatically.'}
              {mayhemMode === 'trigger' && 'The Mayhem agent only executes a transaction when prompted by the coin creator.'}
              {mayhemMode === 'party' && 'In Party, anyone can trigger the agent if they hold enough of the coin supply.'}
            </p>
          </>
        )}

        <p className="create-hint">
          Activates anytime for 24h, set at creation. <span style={{ color: 'var(--accent)' }}>Read disclaimer</span>
        </p>
      </div>

      <div className="fee-box">
        <div className="fee-row">
          <span>Creation fee</span>
          <strong>1 TON</strong>
        </div>
        <div className="fee-row">
          <span>Minimum first buy</span>
          <strong>0.5 TON</strong>
        </div>
        <div className="fee-total">
          <span>Total</span>
          <span>1.5 TON</span>
        </div>
      </div>

      <button className="create-next-btn" onClick={handleSubmit} disabled={loading || !isConnected}>
        {loading ? '⏳ Creating...' : !isConnected ? 'Connect Wallet First' : '🚀 Create Token (1.5 TON)'}
      </button>
      <p className="create-footer-note">Coin data cannot be changed after creation.</p>
    </div>
  );
}

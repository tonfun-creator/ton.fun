import { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function TokenDetail() {
  const { address } = useParams();
  const [tab, setTab] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState('');

  const token = {
    address,
    name: 'Doge Killer',
    symbol: 'DOGEK',
    emoji: '🐕',
    price: '0.00042',
    marketCap: '12,500',
    supply: '31,000,000',
    raised: '420',
  };

  const handleTrade = () => {
    if (!amount) return alert('Amount daalein');
    alert(`${tab === 'buy' ? 'Buying' : 'Selling'} ${amount} TON worth of ${token.symbol} (demo)`);
  };

  return (
    <div>
      <div className="detail-header">
        <div className="detail-img">{token.emoji}</div>
        <div className="detail-info">
          <h2>{token.name}</h2>
          <p>${token.symbol}</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-box">
          <div className="stat-label">Price</div>
          <div className="stat-value">{token.price} TON</div>
        </div>
        <div className="stat-box">
          <div className="stat-label">Market Cap</div>
          <div className="stat-value">${token.marketCap}</div>
        </div>
        <div className="stat-box">
          <div className="stat-label">Supply</div>
          <div className="stat-value">{token.supply}</div>
        </div>
        <div className="stat-box">
          <div className="stat-label">Raised</div>
          <div className="stat-value">{token.raised} TON</div>
        </div>
      </div>

      <div className="trade-panel">
        <div className="trade-tabs">
          <button
            className={`trade-tab ${tab === 'buy' ? 'active buy' : ''}`}
            onClick={() => setTab('buy')}
          >
            Buy
          </button>
          <button
            className={`trade-tab ${tab === 'sell' ? 'active sell' : ''}`}
            onClick={() => setTab('sell')}
          >
            Sell
          </button>
        </div>

        <div className="trade-input-row">
          <input
            className="trade-input"
            type="number"
            placeholder={tab === 'buy' ? 'Amount in TON' : 'Amount in tokens'}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <button className={`trade-btn ${tab}`} onClick={handleTrade}>
          {tab === 'buy' ? '💰 Buy' : '💸 Sell'} {token.symbol}
        </button>
      </div>
    </div>
  );
}

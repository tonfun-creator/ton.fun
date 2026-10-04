import { useState } from 'react';
import { useParams } from 'react-router-dom';

// ===== Simple SVG Chart Component =====
function PriceChart({ data, color = '#4ade80' }: { data: number[]; color?: string }) {
  const width = 340;
  const height = 160;
  const padding = 8;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((value, i) => {
    const x = padding + (i / (data.length - 1)) * (width - padding * 2);
    const y = height - padding - ((value - min) / range) * (height - padding * 2);
    return `${x},${y}`;
  }).join(' ');

  const areaPoints = `${padding},${height - padding} ${points} ${width - padding},${height - padding}`;

  return (
    <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.4" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill="url(#areaGrad)" />
      <polyline points={points} fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

type Tab = 'callouts' | 'holders' | 'about';

export default function TokenDetail() {
  const { address } = useParams();
  const [tab, setTab] = useState<Tab>('callouts');
  const [tradeTab, setTradeTab] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState('');
  const [timeframe, setTimeframe] = useState('all');

  // Demo token data
  const token = {
    address,
    name: 'NUTFLEX',
    symbol: 'NUTFLX',
    emoji: '🍎',
    marketCap: '109.51K',
    change: '+2630.1%',
    isPositive: true,
    holders: 739,
    price: '0.00042',
    supply: '31,000,000',
    raised: '420',
    // Audit
    fees: 29.01,
    top10: 32,
    snipers: 0,
    devHoldings: 0,
    bundlers: 0,
    // Stats
    enters: 4285,
    exits: 3054,
    // Chart data
    chartData: [10, 12, 11, 15, 14, 18, 22, 20, 25, 30, 28, 35, 42, 38, 45, 52, 48, 55, 50, 42, 48, 55, 52, 48, 55],
  };

  const handleTrade = () => {
    if (!amount) return alert('Amount daalein');
    alert(`${tradeTab === 'buy' ? 'Buying' : 'Selling'} ${amount} ${tradeTab === 'buy' ? 'TON worth' : token.symbol}`);
  };

  const quickAmounts = ['0.1', '0.5', '1', '5'];

  return (
    <div className="detail-page">
      {/* ===== Top Bar ===== */}
      <div className="detail-topbar">
        <button className="detail-back" onClick={() => window.history.back()}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <span className="detail-topbar-name">{token.name}</span>
        <span className="detail-topbar-time">⏱ 3h</span>
        <span className="detail-topbar-views">👁 234</span>
        <div className="detail-topbar-actions">
          <button className="icon-btn">⭐</button>
          <button className="icon-btn">↗</button>
        </div>
      </div>

      {/* ===== Token Header ===== */}
      <div className="detail-token-header">
        <div className="detail-token-img">{token.emoji}</div>
        <div className="detail-token-info">
          <h1>{token.name}</h1>
          <div className="detail-token-address">
            {token.address?.slice(0, 6)}...{token.address?.slice(-4)}
            <button className="copy-btn">📋</button>
            <span className="social-icon">𝕏</span>
          </div>
        </div>
        <div className="detail-token-mc">
          <div className="mc-label">MC</div>
          <div className="mc-value">${token.marketCap}</div>
          <div className={`mc-change ${token.isPositive ? 'up' : 'down'}`}>
            ↑ {token.change}
          </div>
        </div>
      </div>

      {/* ===== Holders Info ===== */}
      <div className="detail-holders-info">
        {token.holders} holders, no one you're following
      </div>

      {/* ===== Chart ===== */}
      <div className="detail-chart">
        <PriceChart data={token.chartData} color={token.isPositive ? '#4ade80' : '#ef4444'} />
      </div>

      {/* ===== Timeframe Filters ===== */}
      <div className="detail-timeframes">
        {['1m', '5m', '15m', '1h', 'All'].map(tf => (
          <button
            key={tf}
            className={`timeframe-btn ${timeframe === tf.toLowerCase() ? 'active' : ''}`}
            onClick={() => setTimeframe(tf.toLowerCase())}
          >
            {tf}
          </button>
        ))}
        <div className="timeframe-actions">
          <button className="icon-btn-sm">🔔 Alert</button>
          <button className="icon-btn-sm">⚙️</button>
        </div>
      </div>

      {/* ===== Tabs ===== */}
      <div className="detail-tabs">
        <button className={`detail-tab ${tab === 'callouts' ? 'active' : ''}`} onClick={() => setTab('callouts')}>Callouts</button>
        <button className={`detail-tab ${tab === 'holders' ? 'active' : ''}`} onClick={() => setTab('holders')}>Holders</button>
        <button className={`detail-tab ${tab === 'about' ? 'active' : ''}`} onClick={() => setTab('about')}>About</button>
      </div>

      {/* ===== Tab Content ===== */}
      {tab === 'about' && (
        <div className="detail-about">
          {/* Overview */}
          <div className="detail-section">
            <h3>Overview</h3>
            <p className="detail-overview-name">{token.name}</p>
            <div className="detail-tags">
              <span className="tag">⚡ Stonk.fun</span>
              <span className="tag">🅝 NFLX pair</span>
              <span className="tag">📋 {token.address?.slice(0, 8)}</span>
            </div>
            <div className="detail-tags">
              <span className="tag">𝕏 NetflixFR</span>
              <span className="tag">🔍 Search on 𝕏</span>
            </div>
          </div>

          {/* Audit */}
          <div className="detail-section">
            <h3>Audit ℹ️</h3>
            <div className="audit-grid">
              <div className="audit-box">
                <div className="audit-icon">≋</div>
                <div className="audit-value">{token.fees}</div>
                <div className="audit-label">Fees (F)</div>
              </div>
              <div className="audit-box">
                <div className="audit-icon green">👤</div>
                <div className="audit-value">{token.holders}</div>
                <div className="audit-label">Holders</div>
              </div>
              <div className="audit-box">
                <div className="audit-icon red">👑</div>
                <div className="audit-value">{token.top10}%</div>
                <div className="audit-label">Top 10 holders</div>
              </div>
              <div className="audit-box">
                <div className="audit-icon green">🎯</div>
                <div className="audit-value">{token.snipers}%</div>
                <div className="audit-label">Snipers</div>
              </div>
              <div className="audit-box">
                <div className="audit-icon">—</div>
                <div className="audit-value">{token.devHoldings}</div>
                <div className="audit-label">Dev holdings</div>
              </div>
              <div className="audit-box">
                <div className="audit-icon green">📚</div>
                <div className="audit-value">{token.bundlers}%</div>
                <div className="audit-label">Bundlers</div>
              </div>
            </div>
            <button className="view-holders-btn">
              🔍 View holders bubblemap →
            </button>
          </div>

          {/* Stats */}
          <div className="detail-section">
            <div className="detail-section-header">
              <h3>Stats</h3>
              <div className="stats-timeframe">
                {['5M', '1H', '1D'].map(t => (
                  <button key={t} className={`stats-tf-btn ${t === '1H' ? 'active' : ''}`}>{t}</button>
                ))}
              </div>
            </div>
            <div className="stats-row">
              <div className="stats-enters">🟢 {token.enters} Enters</div>
              <div className="stats-exits">🔴 {token.exits} Exits</div>
            </div>
          </div>
        </div>
      )}

      {tab === 'callouts' && (
        <div className="detail-callouts">
          <button className="new-callout-btn">↑ New callouts</button>
          <div className="callout-item">
            <div className="callout-avatar">🦆</div>
            <div className="callout-content">
              <div className="callout-header">
                <strong>TheAnchor</strong> <span className="verified">𝕏</span> <span className="follow-btn">Follow</span>
                <span className="callout-time">1h ago</span>
              </div>
              <p>Netflix replied directly to THIS ca...</p>
              <div className="callout-position">
                <div>
                  <div className="pos-label">Position</div>
                  <div className="pos-value">$144.46</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="pos-label">Profit</div>
                  <div className="pos-value green">+$383.86 ↑ 210%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 'holders' && (
        <div className="detail-holders">
          <div className="holders-header">
            <button className="holders-filter active">Pump.fun (482)</button>
            <button className="holders-filter">Following (0)</button>
            <button className="holders-filter">All</button>
          </div>
          <div className="holder-item">
            <div className="holder-avatar">🧢</div>
            <div className="holder-info">
              <strong>saucyoctopus776</strong>
              <div className="holder-pct">2.84% | $3,114.69</div>
            </div>
            <div className="holder-profit">
              <div>$2,607.26</div>
              <div className="green">↑ 513.8%</div>
            </div>
          </div>
        </div>
      )}

      {/* ===== Trade Panel ===== */}
      <div className="trade-panel-fixed">
        <div className="trade-tabs-dark">
          <button
            className={`trade-tab-dark ${tradeTab === 'buy' ? 'active' : ''}`}
            onClick={() => setTradeTab('buy')}
          >
            Buy
          </button>
          <button
            className={`trade-tab-dark ${tradeTab === 'sell' ? 'active' : ''}`}
            onClick={() => setTradeTab('sell')}
          >
            Sell
          </button>
        </div>

        <div className="trade-input-dark">
          <input
            type="number"
            placeholder={tradeTab === 'buy' ? '0' : '0'}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <span className="trade-currency">{tradeTab === 'buy' ? 'TON' : token.symbol}</span>
        </div>

        <div className="quick-amounts">
          {quickAmounts.map(q => (
            <button
              key={q}
              className={`quick-amount-btn ${amount === q ? 'active' : ''}`}
              onClick={() => setAmount(q)}
            >
              {q}
            </button>
          ))}
        </div>

        <button className={`trade-submit ${tradeTab}`} onClick={handleTrade}>
          {tradeTab === 'buy' ? '💰 Buy' : '💸 Sell'} {token.symbol}
        </button>
      </div>
    </div>
  );
}

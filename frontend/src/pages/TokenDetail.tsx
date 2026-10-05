import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PriceChart from '../components/PriceChart';

interface CandleData {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

function generateDemoData(count: number, startPrice: number): CandleData[] {
  const data: CandleData[] = [];
  let price = startPrice;
  const now = Date.now();
  for (let i = 0; i < count; i++) {
    const open = price;
    const change = (Math.random() - 0.45) * startPrice * 0.1;
    const close = Math.max(open + change, startPrice * 0.1);
    const high = Math.max(open, close) + Math.random() * startPrice * 0.02;
    const low = Math.min(open, close) - Math.random() * startPrice * 0.02;
    data.push({ time: now - (count - i) * 60000, open, high, low, close, volume: Math.random() * 10000 + 1000 });
    price = close;
  }
  return data;
}

const HOLDERS = [
  { rank: 1, name: 'saucyoctopus776', avatar: '🧢', pct: '2.84%', value: '$3,114.69', profit: '+513.8%' },
  { rank: 2, name: 'epicsealrash', avatar: '🦭', pct: '1.95%', value: '$2,138.48', profit: '+215.3%' },
  { rank: 3, name: 'cryptokid99', avatar: '🎮', pct: '1.72%', value: '$1,880.20', profit: '+188.7%' },
  { rank: 4, name: 'moonwalker', avatar: '🌙', pct: '1.45%', value: '$1,587.50', profit: '+142.1%' },
  { rank: 5, name: 'diamond_hands', avatar: '💎', pct: '1.28%', value: '$1,401.10', profit: '+98.5%' },
];

const CALLOUTS = [
  { user: 'TheAnchor', avatar: '🕵️', time: '1h ago', text: 'Netflix replied directly to THIS callout...', position: '$144.46', profit: '+$383.86', pct: '210%' },
  { user: 'OG_verified', avatar: '🐸', time: '1h ago', text: 'Netflix interacted. Crazy...game on!', position: '$88.20', profit: '+$205.30', pct: '233%' },
  { user: 'DegenTrader', avatar: '🎰', time: '2h ago', text: 'This is going to 100K MC easy', position: '$250.00', profit: '+$500.00', pct: '200%' },
];

export default function TokenDetail() {
  const { address } = useParams();
  const [tab, setTab] = useState<'callouts' | 'holders' | 'about'>('callouts');
  const [tradeTab, setTradeTab] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState('');
  const [timeframe, setTimeframe] = useState('1h');
  const [chartData, setChartData] = useState<CandleData[]>([]);
  const [statsTf, setStatsTf] = useState('1H');

  const token = {
    address,
    name: 'NUTFLEX',
    symbol: 'NUTFLX',
    emoji: '🍎',
    marketCap: '109.51K',
    change: '+2630.1%',
    isPositive: true,
    holders: 739,
    fees: 29.01,
    top10: 32,
    snipers: 0,
    devHoldings: 0,
    bundlers: 0,
    enters: 4285,
    exits: 3054,
    price: 0.00042,
  };

  useEffect(() => {
    const count = timeframe === '1m' ? 30 : timeframe === '5m' ? 50 : timeframe === '1h' ? 60 : 100;
    setChartData(generateDemoData(count, 0.0003));
  }, [timeframe]);

  const handleTrade = () => {
    if (!amount) return alert('Amount daalein');
    alert(`${tradeTab === 'buy' ? 'Buying' : 'Selling'} ${amount} ${token.symbol}`);
  };

  const quickAmounts = ['0.1', '0.5', '1', '5'];

  return (
    <div className="detail-page">
      {/* Top Bar */}
      <div className="detail-topbar">
        <button className="detail-back" onClick={() => window.history.back()}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <span className="detail-topbar-name">{token.name}</span>
        <span className="detail-topbar-time">⏱ 3h</span>
        <span className="detail-topbar-views">👁 234</span>
      </div>

      {/* Token Header */}
      <div className="detail-token-header">
        <div className="detail-token-img">{token.emoji}</div>
        <div className="detail-token-info">
          <h1>{token.name}</h1>
          <div className="detail-token-address">
            {token.address?.slice(0, 6)}...{token.address?.slice(-4)}
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

      <div className="detail-holders-info">{token.holders} holders</div>

      {/* Chart */}
      <div className="detail-chart">
        <PriceChart data={chartData} height={260} />
      </div>

      {/* Timeframe */}
      <div className="detail-timeframes">
        {['1m', '5m', '15m', '1h', 'All'].map(tf => (
          <button
            key={tf}
            className={`timeframe-btn ${timeframe === tf ? 'active' : ''}`}
            onClick={() => setTimeframe(tf)}
          >
            {tf}
          </button>
        ))}
      </div>

      {/* Tabs */}
      <div className="detail-tabs">
        <button className={`detail-tab ${tab === 'callouts' ? 'active' : ''}`} onClick={() => setTab('callouts')}>Callouts</button>
        <button className={`detail-tab ${tab === 'holders' ? 'active' : ''}`} onClick={() => setTab('holders')}>Holders</button>
        <button className={`detail-tab ${tab === 'about' ? 'active' : ''}`} onClick={() => setTab('about')}>About</button>
      </div>

      {/* Callouts Tab */}
      {tab === 'callouts' && (
        <div className="detail-callouts">
          <button className="new-callout-btn">↑ New callouts</button>
          {CALLOUTS.map((c, i) => (
            <div key={i} className="callout-item">
              <div className="callout-avatar">{c.avatar}</div>
              <div className="callout-content">
                <div className="callout-header">
                  <strong>{c.user}</strong>
                  <span className="follow-btn">Follow</span>
                  <span className="callout-time">{c.time}</span>
                </div>
                <p>{c.text}</p>
                <div className="callout-position">
                  <div>
                    <div className="pos-label">Position</div>
                    <div className="pos-value">{c.position}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div className="pos-label">Profit</div>
                    <div className="pos-value green">{c.profit} ↑ {c.pct}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Holders Tab */}
      {tab === 'holders' && (
        <div className="detail-holders">
          <div className="holders-header">
            <button className="holders-filter active">Pump.fun (482)</button>
            <button className="holders-filter">Following (0)</button>
            <button className="holders-filter">All</button>
          </div>
          {HOLDERS.map((h, i) => (
            <div key={i} className="holder-item">
              <div style={{ width: '20px', fontWeight: 900, fontSize: '13px', color: '#666' }}>#{h.rank}</div>
              <div className="holder-avatar">{h.avatar}</div>
              <div className="holder-info">
                <strong>{h.name}</strong>
                <div className="holder-pct">{h.pct} | {h.value}</div>
              </div>
              <div className="holder-profit">
                <div className="green">↑ {h.profit}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* About / Analytics Tab */}
      {tab === 'about' && (
        <div className="detail-about">
          <div className="detail-section">
            <h3>Overview</h3>
            <div className="detail-tags">
              <span className="tag">⚡ Stonk.fun</span>
              <span className="tag">🅝 Pair</span>
              <span className="tag">📋 {token.address?.slice(0, 8)}</span>
            </div>
            <div className="detail-tags">
              <span className="tag">𝕏 Social</span>
              <span className="tag">🔍 Search</span>
            </div>
          </div>

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
                <div className="audit-label">Top 10</div>
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
          </div>

          <div className="detail-section">
            <div className="detail-section-header">
              <h3>Stats</h3>
              <div className="stats-timeframe">
                {['5M', '1H', '1D'].map(t => (
                  <button
                    key={t}
                    className={`stats-tf-btn ${statsTf === t ? 'active' : ''}`}
                    onClick={() => setStatsTf(t)}
                  >
                    {t}
                  </button>
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

      {/* Trade Panel */}
      <div style={{ padding: '16px', background: '#0a0a0a', borderTop: '1px solid #1a1a1a' }}>
        <div style={{ display: 'flex', gap: '4px', background: '#141414', borderRadius: '10px', padding: '4px', marginBottom: '12px' }}>
          <button
            onClick={() => setTradeTab('buy')}
            style={{
              flex: 1, padding: '10px',
              background: tradeTab === 'buy' ? '#2a2a2a' : 'transparent',
              color: tradeTab === 'buy' ? '#fff' : '#888',
              border: 'none', borderRadius: '8px',
              fontWeight: 800, fontSize: '14px', cursor: 'pointer',
            }}
          >
            Buy
          </button>
          <button
            onClick={() => setTradeTab('sell')}
            style={{
              flex: 1, padding: '10px',
              background: tradeTab === 'sell' ? '#2a2a2a' : 'transparent',
              color: tradeTab === 'sell' ? '#fff' : '#888',
              border: 'none', borderRadius: '8px',
              fontWeight: 800, fontSize: '14px', cursor: 'pointer',
            }}
          >
            Sell
          </button>
        </div>

        <input
          type="number"
          placeholder="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{
            width: '100%', padding: '14px', fontSize: '18px', fontWeight: 800,
            border: '1px solid #2a2a2a', borderRadius: '10px',
            background: '#141414', color: '#fff', marginBottom: '10px', outline: 'none',
          }}
        />

        <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
          {quickAmounts.map(q => (
            <button
              key={q}
              onClick={() => setAmount(q)}
              style={{
                flex: 1, padding: '8px',
                background: amount === q ? '#2a2a2a' : '#141414',
                border: amount === q ? '1px solid #4ade80' : '1px solid #2a2a2a',
                borderRadius: '8px',
                color: amount === q ? '#4ade80' : '#aaa',
                fontWeight: 700, fontSize: '13px', cursor: 'pointer',
              }}
            >
              {q}
            </button>
          ))}
        </div>

        <button
          onClick={handleTrade}
          style={{
            width: '100%', padding: '16px',
            background: tradeTab === 'buy' ? '#4ade80' : '#ef4444',
            color: tradeTab === 'buy' ? '#0a0a0a' : '#fff',
            border: 'none', borderRadius: '12px',
            fontWeight: 900, fontSize: '15px', cursor: 'pointer',
          }}
        >
          {tradeTab === 'buy' ? '💰 Buy' : '💸 Sell'} {token.symbol}
        </button>
      </div>
    </div>
  );
}

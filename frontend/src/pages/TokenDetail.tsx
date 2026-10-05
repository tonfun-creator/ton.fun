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

// Generate demo candle data
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
    const volume = Math.random() * 10000 + 1000;

    data.push({
      time: now - (count - i) * 60000,
      open,
      high,
      low,
      close,
      volume,
    });

    price = close;
  }

  return data;
}

export default function TokenDetail() {
  const { address } = useParams();
  const [tab, setTab] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState('');
  const [timeframe, setTimeframe] = useState('1h');
  const [chartData, setChartData] = useState<CandleData[]>([]);

  const token = {
    address,
    name: 'Doge Killer',
    symbol: 'DOGEK',
    emoji: '🐕',
    price: 0.00042,
    marketCap: '12,500',
    change: '+45%',
    isPositive: true,
    holders: 234,
  };

  // Generate chart data
  useEffect(() => {
    const count = timeframe === '1m' ? 30 : timeframe === '5m' ? 50 : timeframe === '1h' ? 60 : 100;
    setChartData(generateDemoData(count, 0.0003));
  }, [timeframe]);

  const handleTrade = () => {
    if (!amount) return alert('Amount daalein');
    alert(`${tab === 'buy' ? 'Buying' : 'Selling'} ${amount} ${token.symbol}`);
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
        <PriceChart data={chartData} height={300} />
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

      {/* Trade Panel */}
      <div style={{ padding: '16px' }}>
        <div style={{ display: 'flex', gap: '4px', background: '#141414', borderRadius: '10px', padding: '4px', marginBottom: '12px' }}>
          <button
            onClick={() => setTab('buy')}
            style={{
              flex: 1,
              padding: '10px',
              background: tab === 'buy' ? '#2a2a2a' : 'transparent',
              color: tab === 'buy' ? '#fff' : '#888',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 800,
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            Buy
          </button>
          <button
            onClick={() => setTab('sell')}
            style={{
              flex: 1,
              padding: '10px',
              background: tab === 'sell' ? '#2a2a2a' : 'transparent',
              color: tab === 'sell' ? '#fff' : '#888',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 800,
              fontSize: '14px',
              cursor: 'pointer',
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
            width: '100%',
            padding: '14px',
            fontSize: '18px',
            fontWeight: 800,
            border: '1px solid #2a2a2a',
            borderRadius: '10px',
            background: '#141414',
            color: '#fff',
            marginBottom: '10px',
            outline: 'none',
          }}
        />

        <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
          {quickAmounts.map(q => (
            <button
              key={q}
              onClick={() => setAmount(q)}
              style={{
                flex: 1,
                padding: '8px',
                background: amount === q ? '#2a2a2a' : '#141414',
                border: amount === q ? '1px solid #4ade80' : '1px solid #2a2a2a',
                borderRadius: '8px',
                color: amount === q ? '#4ade80' : '#aaa',
                fontWeight: 700,
                fontSize: '13px',
                cursor: 'pointer',
              }}
            >
              {q}
            </button>
          ))}
        </div>

        <button
          onClick={handleTrade}
          style={{
            width: '100%',
            padding: '16px',
            background: tab === 'buy' ? '#4ade80' : '#ef4444',
            color: tab === 'buy' ? '#0a0a0a' : '#fff',
            border: 'none',
            borderRadius: '12px',
            fontWeight: 900,
            fontSize: '15px',
            cursor: 'pointer',
          }}
        >
          {tab === 'buy' ? '💰 Buy' : '💸 Sell'} {token.symbol}
        </button>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PriceChart from '../components/PriceChart';
import TokenActions from '../components/TokenActions';
import EmojiReactions from '../components/EmojiReactions';
import Comments from '../components/Comments';
import FollowButton from '../components/FollowButton';
import MemeGenerator from '../components/MemeGenerator';

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
  const [tab, setTab] = useState<'callouts' | 'comments' | 'holders' | 'about'>('callouts');
  const [tradeTab, setTradeTab] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState('');
  const [timeframe, setTimeframe] = useState('1h');
  const [chartData, setChartData] = useState<CandleData[]>([]);

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
    <div style={{ background: 'var(--bg)', margin: '-16px', padding: '16px 16px 120px', minHeight: '100vh' }}>

      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
        <button onClick={() => window.history.back()} style={{ background: 'var(--surface)', border: '3px solid #000', borderRadius: '10px', color: 'var(--fg)', width: '36px', height: '36px', fontSize: '16px', boxShadow: '2px 2px 0 #000' }}>←</button>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '15px' }}>{token.name}</span>
        <span style={{ fontSize: '11px', color: 'var(--muted)' }}>⏱ 3h</span>
        <span style={{ fontSize: '11px', color: 'var(--muted)' }}>👁 234</span>
      </div>

      {/* Header */}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '10px' }}>
        <div style={{ width: '56px', height: '56px', background: 'var(--surface-2)', border: '3px solid #000', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', flexShrink: 0 }}>{token.emoji}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 800 }}>{token.name}</h1>
          <div style={{ fontSize: '11px', color: 'var(--muted)' }}>{token.address?.slice(0, 6)}...{token.address?.slice(-4)}</div>
        </div>
        <TokenActions address={address || ''} name={token.name} />
      </div>

      {/* MC */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '10px', padding: '12px 14px', background: 'var(--surface)', border: '3px solid #000', borderRadius: '12px', boxShadow: '3px 3px 0 #000' }}>
        <div>
          <div style={{ fontSize: '10px', color: 'var(--muted)', fontWeight: 700, letterSpacing: '1px' }}>MARKET CAP</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 900 }}>${token.marketCap}</div>
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '14px', fontWeight: 800, color: 'var(--up)', background: 'rgba(61,220,132,0.15)', padding: '4px 10px', borderRadius: '8px' }}>↑ {token.change}</div>
      </div>

      <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '12px' }}>{token.holders} holders</div>

      {/* Chart */}
      <div style={{ background: 'var(--surface)', border: '3px solid #000', borderRadius: '14px', padding: '8px 4px', boxShadow: '3px 3px 0 #000', marginBottom: '12px' }}>
        <PriceChart data={chartData} height={240} />
      </div>

      {/* Timeframe */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '14px', overflowX: 'auto' }}>
        {['1m', '5m', '15m', '1h', 'All'].map(tf => (
          <button key={tf} onClick={() => setTimeframe(tf)} style={{
            padding: '8px 14px', flexShrink: 0,
            background: timeframe === tf ? 'var(--accent)' : 'var(--surface)',
            color: timeframe === tf ? 'var(--accent-ink)' : 'var(--fg)',
            border: '3px solid #000', borderRadius: '999px',
            fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '12px',
            boxShadow: timeframe === tf ? '3px 3px 0 #0a6aa6' : '3px 3px 0 #000',
          }}>{tf}</button>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '14px', overflowX: 'auto' }}>
        {(['callouts', 'comments', 'holders', 'about'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: '8px 16px', flexShrink: 0,
            background: tab === t ? 'var(--accent)' : 'var(--surface)',
            color: tab === t ? 'var(--accent-ink)' : 'var(--fg)',
            border: '3px solid #000', borderRadius: '10px',
            fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '12px',
            textTransform: 'capitalize',
            boxShadow: tab === t ? '3px 3px 0 #0a6aa6' : '3px 3px 0 #000',
          }}>{t}</button>
        ))}
      </div>

      {/* Callouts */}
      {tab === 'callouts' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {CALLOUTS.map((c, i) => (
            <div key={i} style={{ background: 'var(--surface)', border: '3px solid #000', borderRadius: '14px', padding: '14px', boxShadow: '3px 3px 0 #000' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <div style={{ width: '36px', height: '36px', background: 'var(--surface-2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>{c.avatar}</div>
                <strong style={{ fontSize: '13px' }}>{c.user}</strong>
                <FollowButton username={c.user} />
                <span style={{ fontSize: '11px', color: 'var(--muted)', marginLeft: 'auto' }}>{c.time}</span>
              </div>
              <p style={{ fontSize: '13px', color: '#ccc', marginBottom: '10px' }}>{c.text}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', background: 'var(--bg)', borderRadius: '10px', padding: '10px', border: '2px solid #28313e' }}>
                <div>
                  <div style={{ fontSize: '10px', color: 'var(--muted)', fontWeight: 700 }}>POSITION</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800 }}>{c.position}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '10px', color: 'var(--muted)', fontWeight: 700 }}>PROFIT</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--up)' }}>{c.profit} ↑ {c.pct}</div>
                </div>
              </div>
              <EmojiReactions calloutId={`callout-${i}`} />
            </div>
          ))}
        </div>
      )}

      {tab === 'comments' && <Comments tokenAddress={address || ''} />}

      {/* Holders */}
      {tab === 'holders' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {HOLDERS.map((h, i) => (
            <div key={i} style={{ background: 'var(--surface)', border: '3px solid #000', borderRadius: '12px', padding: '12px 14px', boxShadow: '3px 3px 0 #000', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '13px', color: 'var(--muted)', width: '24px' }}>#{h.rank}</div>
              <div style={{ width: '38px', height: '38px', background: 'var(--surface-2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>{h.avatar}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: '13px' }}>{h.name}</div>
                <div style={{ fontSize: '10px', color: 'var(--muted)' }}>{h.pct} | {h.value}</div>
              </div>
              <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--up)' }}>↑ {h.profit}</div>
            </div>
          ))}
        </div>
      )}

      {/* About */}
      {tab === 'about' && (
        <div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 800, marginBottom: '12px' }}>Audit ℹ️</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '20px' }}>
            {[
              { icon: '≋', value: token.fees, label: 'Fees' },
              { icon: '👤', value: token.holders, label: 'Holders' },
              { icon: '👑', value: token.top10 + '%', label: 'Top 10' },
              { icon: '🎯', value: token.snipers + '%', label: 'Snipers' },
              { icon: '—', value: token.devHoldings, label: 'Dev' },
              { icon: '📚', value: token.bundlers + '%', label: 'Bundlers' },
            ].map((b, i) => (
              <div key={i} style={{ background: 'var(--surface)', border: '3px solid #000', borderRadius: '12px', padding: '12px 8px', textAlign: 'center', boxShadow: '3px 3px 0 #000' }}>
                <div style={{ fontSize: '16px', marginBottom: '4px' }}>{b.icon}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '14px' }}>{b.value}</div>
                <div style={{ fontSize: '10px', color: 'var(--muted)', marginTop: '2px' }}>{b.label}</div>
              </div>
            ))}
          </div>
          <MemeGenerator tokenName={token.name} tokenSymbol={token.symbol} emoji={token.emoji} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', fontFamily: 'var(--font-display)', fontWeight: 800 }}>
            <span style={{ color: 'var(--up)' }}>🟢 {token.enters} Enters</span>
            <span style={{ color: 'var(--down)' }}>🔴 {token.exits} Exits</span>
          </div>
        </div>
      )}

      {/* Trade panel */}
      <div style={{ position: 'fixed', bottom: '70px', left: 0, right: 0, background: 'var(--surface)', borderTop: '3px solid #000', padding: '12px 16px', zIndex: 150 }}>
        <div style={{ display: 'flex', gap: '4px', background: 'var(--bg)', borderRadius: '10px', padding: '4px', marginBottom: '10px' }}>
          <button onClick={() => setTradeTab('buy')} style={{ flex: 1, padding: '10px', background: tradeTab === 'buy' ? 'var(--up)' : 'transparent', color: tradeTab === 'buy' ? '#052412' : 'var(--muted)', border: 'none', borderRadius: '8px', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '14px' }}>Buy</button>
          <button onClick={() => setTradeTab('sell')} style={{ flex: 1, padding: '10px', background: tradeTab === 'sell' ? 'var(--down)' : 'transparent', color: tradeTab === 'sell' ? '#fff' : 'var(--muted)', border: 'none', borderRadius: '8px', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '14px' }}>Sell</button>
        </div>
        <input type="number" placeholder="0.0" value={amount} onChange={(e) => setAmount(e.target.value)} style={{ width: '100%', padding: '12px 14px', background: 'var(--bg)', border: '3px solid #000', borderRadius: '10px', color: 'var(--fg)', fontSize: '16px', fontWeight: 700, marginBottom: '8px', outline: 'none' }} />
        <div style={{ display: 'flex', gap: '6px', marginBottom: '10px' }}>
          {quickAmounts.map(q => (
            <button key={q} onClick={() => setAmount(q)} style={{ flex: 1, padding: '8px', background: amount === q ? 'var(--accent)' : 'var(--bg)', border: '3px solid #000', borderRadius: '8px', color: amount === q ? 'var(--accent-ink)' : 'var(--muted)', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '12px' }}>{q}</button>
          ))}
        </div>
        <button onClick={handleTrade} style={{ width: '100%', padding: '14px', background: tradeTab === 'buy' ? 'var(--up)' : 'var(--down)', color: tradeTab === 'buy' ? '#052412' : '#fff', border: '3px solid #000', borderRadius: '12px', fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '15px', boxShadow: tradeTab === 'buy' ? '3px 3px 0 #138343' : '3px 3px 0 #a3263a' }}>
          {tradeTab === 'buy' ? '💰 Buy' : '💸 Sell'} {token.symbol}
        </button>
      </div>
    </div>
  );
}

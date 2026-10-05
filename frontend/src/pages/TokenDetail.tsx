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
  };

  return (
    <div className="detail-page" style={{ padding: '20px' }}>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ fontSize: '48px' }}>{token.emoji}</div>
        <div>
          <h1>{token.name}</h1>
          <p style={{ color: '#666' }}>${token.symbol}</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '20px' }}>
        <div style={{ background: 'white', padding: '12px', borderRadius: '10px' }}>
          <div style={{ fontSize: '11px', color: '#666' }}>Price</div>
          <div style={{ fontSize: '16px', fontWeight: 900 }}>{token.price} TON</div>
        </div>
        <div style={{ background: 'white', padding: '12px', borderRadius: '10px' }}>
          <div style={{ fontSize: '11px', color: '#666' }}>MCAP</div>
          <div style={{ fontSize: '16px', fontWeight: 900 }}>${token.marketCap}</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
        <button
          onClick={() => setTab('buy')}
          style={{ flex: 1, padding: '12px', background: tab === 'buy' ? '#16a34a' : '#eee', color: tab === 'buy' ? 'white' : '#333', border: 'none', borderRadius: '10px', fontWeight: 700 }}
        >
          Buy
        </button>
        <button
          onClick={() => setTab('sell')}
          style={{ flex: 1, padding: '12px', background: tab === 'sell' ? '#dc2626' : '#eee', color: tab === 'sell' ? 'white' : '#333', border: 'none', borderRadius: '10px', fontWeight: 700 }}
        >
          Sell
        </button>
      </div>

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ width: '100%', padding: '14px', fontSize: '16px', border: '2px solid #0a0a0a', borderRadius: '10px', marginBottom: '12px' }}
      />

      <button style={{ width: '100%', padding: '16px', background: tab === 'buy' ? '#16a34a' : '#dc2626', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 900, fontSize: '15px' }}>
        {tab === 'buy' ? '💰 Buy' : '💸 Sell'} {token.symbol}
      </button>
    </div>
  );
}

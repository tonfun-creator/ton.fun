import { useState } from 'react';
import TokenCard from '../components/TokenCard';

// Demo data — baad mein blockchain se aayega
const DEMO_TOKENS = [
  { address: 'EQD1', name: 'Doge Killer', symbol: 'DOGEK', marketCap: '12.5K', change: '+45%', emoji: '🐕' },
  { address: 'EQD2', name: 'Pepe TON', symbol: 'PEPET', marketCap: '8.2K', change: '+120%', emoji: '🐸' },
  { address: 'EQD3', name: 'Moon Coin', symbol: 'MOON', marketCap: '5.1K', change: '-12%', emoji: '🌙' },
  { address: 'EQD4', name: 'Cat Coin', symbol: 'CAT', marketCap: '3.4K', change: '+28%', emoji: '🐱' },
  { address: 'EQD5', name: 'Rocket', symbol: 'RKT', marketCap: '2.1K', change: '+8%', emoji: '🚀' },
  { address: 'EQD6', name: 'Diamond', symbol: 'DIA', marketCap: '1.5K', change: '+15%', emoji: '💎' },
];

export default function Home() {
  const [filter, setFilter] = useState('new');

  return (
    <div>
      <h1 className="page-title">Discover Tokens</h1>
      <p className="page-subtitle">Launch and trade meme coins on TON</p>

      <div className="filters">
        <button
          className={`filter-btn ${filter === 'new' ? 'active' : ''}`}
          onClick={() => setFilter('new')}
        >
          🆕 New
        </button>
        <button
          className={`filter-btn ${filter === 'trending' ? 'active' : ''}`}
          onClick={() => setFilter('trending')}
        >
          🔥 Trending
        </button>
        <button
          className={`filter-btn ${filter === 'graduating' ? 'active' : ''}`}
          onClick={() => setFilter('graduating')}
        >
          🎓 Graduating
        </button>
        <button
          className={`filter-btn ${filter === 'graduated' ? 'active' : ''}`}
          onClick={() => setFilter('graduated')}
        >
          ✅ Graduated
        </button>
      </div>

      <div className="token-grid">
        {DEMO_TOKENS.map((t) => (
          <TokenCard key={t.address} {...t} />
        ))}
      </div>
    </div>
  );
}

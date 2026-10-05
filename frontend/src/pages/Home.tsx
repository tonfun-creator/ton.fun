import { useState, useMemo } from 'react';
import TokenCard from '../components/TokenCard';

const ALL_TOKENS = [
  { address: 'EQD1', name: 'Doge Killer', symbol: 'DOGEK', marketCap: '12.5K', change: '+45%', emoji: '🐕', status: 'new', createdAt: Date.now() - 2 * 3600000 },
  { address: 'EQD2', name: 'Pepe TON', symbol: 'PEPET', marketCap: '8.2K', change: '+120%', emoji: '🐸', status: 'trending', createdAt: Date.now() - 5 * 3600000 },
  { address: 'EQD3', name: 'Moon Coin', symbol: 'MOON', marketCap: '5.1K', change: '-12%', emoji: '🌙', status: 'new', createdAt: Date.now() - 1 * 3600000 },
  { address: 'EQD4', name: 'Cat Coin', symbol: 'CAT', marketCap: '3.4K', change: '+28%', emoji: '🐱', status: 'trending', createdAt: Date.now() - 8 * 3600000 },
  { address: 'EQD5', name: 'Rocket', symbol: 'RKT', marketCap: '2.1K', change: '+8%', emoji: '🚀', status: 'graduating', createdAt: Date.now() - 12 * 3600000 },
  { address: 'EQD6', name: 'Diamond', symbol: 'DIA', marketCap: '1.5K', change: '+15%', emoji: '💎', status: 'graduated', createdAt: Date.now() - 24 * 3600000 },
  { address: 'EQD7', name: 'Trump Coin', symbol: 'TRUMP', marketCap: '22.4K', change: '+250%', emoji: '🇺🇸', status: 'trending', createdAt: Date.now() - 3 * 3600000 },
  { address: 'EQD8', name: 'Penguin', symbol: 'PENGU', marketCap: '15.7K', change: '+88%', emoji: '🐧', status: 'graduating', createdAt: Date.now() - 4 * 3600000 },
  { address: 'EQD9', name: 'NUTFLEX', symbol: 'NUTFLX', marketCap: '109.5K', change: '+2630%', emoji: '🍎', status: 'graduated', createdAt: Date.now() - 6 * 3600000 },
  { address: 'EQD10', name: 'Super Intelligence', symbol: 'SI', marketCap: '338K', change: '+720%', emoji: '🧠', status: 'trending', createdAt: Date.now() - 5 * 3600000 },
];

type FilterType = 'new' | 'trending' | 'graduating' | 'graduated';

export default function Home() {
  const [filter, setFilter] = useState<FilterType>('new');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTokens = useMemo(() => {
    let tokens = [...ALL_TOKENS];

    // Category filter
    tokens = tokens.filter(t => t.status === filter);

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      tokens = tokens.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.symbol.toLowerCase().includes(q)
      );
    }

    // Sort: newest first
    tokens.sort((a, b) => b.createdAt - a.createdAt);

    return tokens;
  }, [filter, searchQuery]);

  return (
    <div>
      <h1 className="page-title">Discover Tokens</h1>
      <p className="page-subtitle">Launch and trade meme coins on TON</p>

      {/* Search Bar */}
      <div className="search-container">
        <div className="search-bar">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="search-icon">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
            <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Search tokens by name or symbol..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="search-clear" onClick={() => setSearchQuery('')}>✕</button>
          )}
        </div>
      </div>

      {/* Filters */}
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

      {/* Results Count */}
      <div className="results-count">
        {filteredTokens.length} token{filteredTokens.length !== 1 ? 's' : ''}
        {searchQuery && ` for "${searchQuery}"`}
      </div>

      {/* Token Grid */}
      {filteredTokens.length > 0 ? (
        <div className="token-grid">
          {filteredTokens.map((t) => (
            <TokenCard key={t.address} {...t} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <div className="empty-state-text">No tokens found</div>
          <p style={{ fontSize: '13px', color: '#666', marginTop: '8px' }}>
            Try a different filter
          </p>
        </div>
      )}
    </div>
  );
}

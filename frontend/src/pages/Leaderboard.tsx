import { useState } from 'react';

const DEMO_TRADERS = [
  { rank: 1, name: 'TheSolstice', avatar: '👑', profit: '+$1,483,722', pct: '+450%', followers: '13K' },
  { rank: 2, name: 'J777Crypto', avatar: '🥈', profit: '+$612,202', pct: '+280%', followers: '18K' },
  { rank: 3, name: 'Crypto_Keys', avatar: '🥉', profit: '+$495,103', pct: '+195%', followers: '99K' },
  { rank: 4, name: 'Anglio', avatar: '🦆', profit: '+$15,780', pct: '+120%', followers: '4.2K' },
  { rank: 5, name: 'Proteus1', avatar: '🔷', profit: '+$25,290', pct: '+95%', followers: '2.8K' },
  { rank: 6, name: 'the_nutgod', avatar: '🥜', profit: '+$20,390', pct: '+88%', followers: '3.1K' },
  { rank: 7, name: 'HalibutCrypto', avatar: '🐟', profit: '+$71,830', pct: '+210%', followers: '5.6K' },
  { rank: 8, name: 'sadcrissy', avatar: '😢', profit: '+$14,500', pct: '+75%', followers: '1.9K' },
];

export default function Leaderboard() {
  const [timeframe, setTimeframe] = useState('1D');
  const [tab, setTab] = useState('traders');

  return (
    <div style={{ padding: '0 0 80px 0' }}>
      <div style={{ padding: '16px' }}>
        <h1 className="page-title">Leaderboard</h1>
        <p className="page-subtitle">Top traders on ton.fun</p>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '6px', marginBottom: '16px', overflowX: 'auto' }}>
          {['Traders', 'Squads', 'Rewards', 'Best callouts'].map(t => (
            <button
              key={t}
              onClick={() => setTab(t.toLowerCase())}
              style={{
                background: tab === t.toLowerCase() ? '#0a0a0a' : 'white',
                color: tab === t.toLowerCase() ? '#90EE90' : '#0a0a0a',
                border: '2px solid #0a0a0a',
                padding: '8px 14px',
                borderRadius: '999px',
                fontWeight: 700,
                fontSize: '12px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Timeframe */}
        <div style={{ display: 'flex', gap: '6px', marginBottom: '16px' }}>
          {['1D', '1W', '1M'].map(tf => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              style={{
                background: timeframe === tf ? '#0a0a0a' : 'white',
                color: timeframe === tf ? '#90EE90' : '#0a0a0a',
                border: '2px solid #0a0a0a',
                padding: '6px 16px',
                borderRadius: '999px',
                fontWeight: 700,
                fontSize: '12px',
                cursor: 'pointer',
              }}
            >
              {tf}
            </button>
          ))}
        </div>

        {/* Top 3 Podium */}
        <div style={{
          background: '#0a0a0a',
          borderRadius: '16px',
          padding: '24px 16px',
          marginBottom: '20px',
          color: 'white',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'flex-end',
        }}>
          {[DEMO_TRADERS[1], DEMO_TRADERS[0], DEMO_TRADERS[2]].map((t, i) => {
            const heights = ['80px', '110px', '70px'];
            const colors = ['#c0c0c0', '#ffd700', '#cd7f32'];
            return (
              <div key={t.rank} style={{ textAlign: 'center', flex: 1 }}>
                <div style={{ fontSize: '32px', marginBottom: '4px' }}>{t.avatar}</div>
                <div style={{ fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>{t.name}</div>
                <div style={{ fontSize: '11px', color: '#4ade80', fontWeight: 700, marginBottom: '8px' }}>{t.profit}</div>
                <div style={{
                  height: heights[i],
                  background: colors[i],
                  borderRadius: '8px 8px 0 0',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  paddingTop: '8px',
                  fontSize: '24px',
                  fontWeight: 900,
                  color: '#0a0a0a',
                }}>
                  #{t.rank}
                </div>
              </div>
            );
          })}
        </div>

        {/* Full List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {DEMO_TRADERS.map(t => (
            <div key={t.rank} style={{
              background: 'white',
              border: '2px solid #0a0a0a',
              borderRadius: '12px',
              padding: '12px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}>
              <div style={{ width: '24px', fontWeight: 900, fontSize: '14px' }}>#{t.rank}</div>
              <div style={{ fontSize: '28px' }}>{t.avatar}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: '14px' }}>{t.name}</div>
                <div style={{ fontSize: '11px', color: '#666' }}>{t.followers} followers</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '14px', fontWeight: 900, color: '#16a34a' }}>{t.profit}</div>
                <div style={{ fontSize: '11px', color: '#666', fontWeight: 700 }}>{t.pct}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

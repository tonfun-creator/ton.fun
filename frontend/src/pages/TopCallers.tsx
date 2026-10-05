import FollowButton from '../components/FollowButton';
import CreatorBadge from '../components/CreatorBadge';

const TOP_CALLERS = [
  { rank: 1, name: 'TheSolstice', avatar: '👑', profit: '+$1,483,722', winRate: '78%', calls: 428, verified: true },
  { rank: 2, name: 'J777Crypto', avatar: '🥈', profit: '+$612,202', winRate: '72%', calls: 312, verified: true },
  { rank: 3, name: 'Crypto_Keys', avatar: '🥉', profit: '+$495,103', winRate: '69%', calls: 256, verified: true },
  { rank: 4, name: 'Anglio', avatar: '🦆', profit: '+$15,780', winRate: '64%', calls: 89, verified: false },
  { rank: 5, name: 'Proteus1', avatar: '🔷', profit: '+$25,290', winRate: '61%', calls: 124, verified: false },
  { rank: 6, name: 'the_nutgod', avatar: '🥜', profit: '+$20,390', winRate: '59%', calls: 98, verified: false },
  { rank: 7, name: 'HalibutCrypto', avatar: '🐟', profit: '+$71,830', winRate: '71%', calls: 187, verified: true },
  { rank: 8, name: 'sadcrissy', avatar: '😢', profit: '+$14,500', winRate: '56%', calls: 76, verified: false },
];

export default function TopCallers() {
  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', margin: '-16px', padding: '20px 16px 80px 0', color: '#fff' }}>
      <div style={{ padding: '0 16px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '4px' }}>Top Callers 🏆</h1>
        <p style={{ fontSize: '13px', color: '#888', marginBottom: '20px' }}>
          Best traders on ton.fun
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {TOP_CALLERS.map(c => (
            <div
              key={c.rank}
              style={{
                background: '#141414',
                border: '1px solid #2a2a2a',
                borderRadius: '12px',
                padding: '12px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div style={{
                width: '24px',
                fontSize: '14px',
                fontWeight: 900,
                color: c.rank <= 3 ? '#ffd700' : '#666',
              }}>
                #{c.rank}
              </div>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: '#1a1a1a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                flexShrink: 0,
              }}>
                {c.avatar}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '2px' }}>
                  <span style={{ fontWeight: 800, fontSize: '14px' }}>{c.name}</span>
                  {c.verified && <CreatorBadge size={12} />}
                </div>
                <div style={{ fontSize: '10px', color: '#888' }}>
                  {c.winRate} win rate · {c.calls} calls
                </div>
              </div>
              <div style={{ textAlign: 'right', marginRight: '8px' }}>
                <div style={{ fontSize: '13px', fontWeight: 900, color: '#4ade80' }}>{c.profit}</div>
              </div>
              <FollowButton username={c.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

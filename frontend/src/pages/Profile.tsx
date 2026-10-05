import { useFollow } from '../hooks/useFollow';
import CreatorBadge from '../components/CreatorBadge';

export default function Profile() {
  const { following } = useFollow();

  const user = {
    username: 'TheSolstice',
    avatar: '👑',
    bio: 'Top trader on ton.fun 🚀 | Early adopter | Finding gems before they moon',
    isVerified: true,
    joined: 'Oct 2024',
    followers: 13000,
    following: 128,
    totalProfit: '+$1,483,722',
    winRate: '78%',
    totalTrades: 428,
  };

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', margin: '-16px', padding: '0 0 40px 0', color: '#fff' }}>
      {/* Cover */}
      <div style={{
        height: '140px',
        background: 'linear-gradient(135deg, #4ade80 0%, #1b5e20 100%)',
        position: 'relative',
      }}>
        <button
          onClick={() => window.history.back()}
          style={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            background: 'rgba(0,0,0,0.5)',
            border: 'none',
            color: '#fff',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: '18px',
          }}
        >
          ←
        </button>
      </div>

      {/* Profile Header */}
      <div style={{ padding: '0 20px', marginTop: '-50px' }}>
        <div style={{
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: '#1a1a1a',
          border: '4px solid #0a0a0a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '48px',
          marginBottom: '12px',
        }}>
          {user.avatar}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
          <h1 style={{ fontSize: '22px', fontWeight: 900 }}>{user.username}</h1>
          {user.isVerified && <CreatorBadge size={18} />}
        </div>

        <p style={{ fontSize: '13px', color: '#aaa', marginBottom: '16px', lineHeight: 1.5 }}>
          {user.bio}
        </p>

        {/* Stats Row */}
        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 900 }}>{user.followers.toLocaleString()}</div>
            <div style={{ fontSize: '11px', color: '#888' }}>Followers</div>
          </div>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 900 }}>{user.following}</div>
            <div style={{ fontSize: '11px', color: '#888' }}>Following</div>
          </div>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 900, color: '#4ade80' }}>{user.totalProfit}</div>
            <div style={{ fontSize: '11px', color: '#888' }}>Total Profit</div>
          </div>
        </div>

        <button style={{
          width: '100%',
          padding: '14px',
          background: '#4ade80',
          color: '#0a0a0a',
          border: 'none',
          borderRadius: '12px',
          fontWeight: 900,
          fontSize: '15px',
          cursor: 'pointer',
          marginBottom: '20px',
        }}>
          {following.length > 0 ? 'Following' : '+ Follow'}
        </button>
      </div>

      {/* Stats Cards */}
      <div style={{ padding: '0 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '20px' }}>
          <div style={{ background: '#141414', border: '1px solid #2a2a2a', borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
            <div style={{ fontSize: '16px', fontWeight: 900, color: '#4ade80' }}>{user.winRate}</div>
            <div style={{ fontSize: '10px', color: '#888', marginTop: '2px' }}>Win Rate</div>
          </div>
          <div style={{ background: '#141414', border: '1px solid #2a2a2a', borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
            <div style={{ fontSize: '16px', fontWeight: 900 }}>{user.totalTrades}</div>
            <div style={{ fontSize: '10px', color: '#888', marginTop: '2px' }}>Trades</div>
          </div>
          <div style={{ background: '#141414', border: '1px solid #2a2a2a', borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
            <div style={{ fontSize: '16px', fontWeight: 900 }}>{user.joined}</div>
            <div style={{ fontSize: '10px', color: '#888', marginTop: '2px' }}>Joined</div>
          </div>
        </div>

        {/* Recent Callouts */}
        <h2 style={{ fontSize: '16px', fontWeight: 900, marginBottom: '12px' }}>Recent Callouts</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            { token: 'NUTFLEX', emoji: '🍎', profit: '+$383.86', pct: '210%' },
            { token: 'PEPET', emoji: '🐸', profit: '+$205.30', pct: '233%' },
            { token: 'TRUMP', emoji: '🇺🇸', profit: '+$500.00', pct: '200%' },
          ].map((c, i) => (
            <div key={i} style={{
              background: '#141414',
              border: '1px solid #2a2a2a',
              borderRadius: '12px',
              padding: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}>
              <div style={{ fontSize: '24px' }}>{c.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: '14px' }}>{c.token}</div>
                <div style={{ fontSize: '11px', color: '#888' }}>Closed position</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '14px', fontWeight: 900, color: '#4ade80' }}>{c.profit}</div>
                <div style={{ fontSize: '11px', color: '#888' }}>{c.pct}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

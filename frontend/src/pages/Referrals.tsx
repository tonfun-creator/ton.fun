import { useReferral } from '../hooks/useReferral';
import { useTelegramUser } from '../hooks/useTelegramUser';

const DEMO_LEADERBOARD = [
  { rank: 1, username: 'CryptoKing', referrals: 245, coins: 1225000 },
  { rank: 2, username: 'DegenTrader', referrals: 189, coins: 945000 },
  { rank: 3, username: 'MoonHunter', referrals: 156, coins: 780000 },
  { rank: 4, username: 'WhaleAlert', referrals: 98, coins: 490000 },
  { rank: 5, username: 'ApeKing', referrals: 87, coins: 435000 },
  { rank: 6, username: 'SatoshiJr', referrals: 65, coins: 325000 },
  { rank: 7, username: 'TokinMaster', referrals: 54, coins: 270000 },
  { rank: 8, username: 'PumpLord', referrals: 42, coins: 210000 },
];

export default function Referrals() {
  const { referralCode, getReferralLink, totalReferrals, totalPointsFromReferrals, completedReferrals, referrals } = useReferral();
  const { user } = useTelegramUser();

  const copyLink = () => {
    const link = getReferralLink();
    navigator.clipboard.writeText(link);
    alert('Referral link copied!');
  };

  const shareLink = async () => {
    const link = getReferralLink();
    const text = `Join ton.fun — launch and trade meme coins on TON! Use my link:`;
    if (navigator.share) {
      try { await navigator.share({ title: 'ton.fun', text, url: link }); } catch {}
    } else {
      navigator.clipboard.writeText(`${text} ${link}`);
      alert('Link copied!');
    }
  };

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', margin: '-16px', padding: '20px 16px 100px 0', color: '#fff' }}>
      <div style={{ padding: '0 16px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '4px' }}>👥 Referrals</h1>
        <p style={{ fontSize: '13px', color: '#888', marginBottom: '20px' }}>
          Invite friends · Earn 5,000 coins per friend who creates a token
        </p>

        {/* All-Time Top Ranking Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #ffd700 0%, #b8860b 100%)',
          borderRadius: '12px',
          padding: '14px',
          marginBottom: '16px',
          color: '#0a0a0a',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1px' }}>ALL-TIME TOP RANKING</div>
          <div style={{ fontSize: '22px', fontWeight: 900, marginTop: '4px' }}>
            🏆 1,000,000 Coins Pool
          </div>
          <div style={{ fontSize: '11px', opacity: 0.8, marginTop: '4px' }}>
            Distributed to top referrers (all-time)
          </div>
        </div>

        {/* Referral Card */}
        <div style={{
          background: 'linear-gradient(135deg, #4ade80 0%, #1b5e20 100%)',
          borderRadius: '16px',
          padding: '20px',
          marginBottom: '16px',
          color: '#fff',
        }}>
          <div style={{ fontSize: '11px', opacity: 0.8, fontWeight: 700, letterSpacing: '1px' }}>
            YOUR REFERRAL CODE
          </div>
          <div style={{
            fontSize: '32px',
            fontWeight: 900,
            letterSpacing: '2px',
            marginTop: '6px',
            marginBottom: '16px',
            fontFamily: 'monospace',
          }}>
            {referralCode}
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={copyLink}
              style={{
                flex: 1,
                padding: '12px',
                background: 'rgba(0,0,0,0.3)',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '10px',
                fontWeight: 800,
                fontSize: '13px',
                cursor: 'pointer',
              }}
            >
              📋 Copy Link
            </button>
            <button
              onClick={shareLink}
              style={{
                flex: 1,
                padding: '12px',
                background: '#0a0a0a',
                color: '#4ade80',
                border: 'none',
                borderRadius: '10px',
                fontWeight: 800,
                fontSize: '13px',
                cursor: 'pointer',
              }}
            >
              ↗ Share
            </button>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '20px' }}>
          <div style={{ background: '#141414', border: '1px solid #2a2a2a', borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
            <div style={{ fontSize: '20px', fontWeight: 900, color: '#4ade80' }}>{totalReferrals}</div>
            <div style={{ fontSize: '10px', color: '#888', marginTop: '2px' }}>Invited</div>
          </div>
          <div style={{ background: '#141414', border: '1px solid #2a2a2a', borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
            <div style={{ fontSize: '20px', fontWeight: 900 }}>{completedReferrals}</div>
            <div style={{ fontSize: '10px', color: '#888', marginTop: '2px' }}>Active</div>
          </div>
          <div style={{ background: '#141414', border: '1px solid #2a2a2a', borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
            <div style={{ fontSize: '16px', fontWeight: 900, color: '#4ade80' }}>
              {totalPointsFromReferrals.toLocaleString()}
            </div>
            <div style={{ fontSize: '10px', color: '#888', marginTop: '2px' }}>Coins</div>
          </div>
        </div>

        {/* Leaderboard */}
        <h2 style={{ fontSize: '16px', fontWeight: 900, marginBottom: '12px' }}>🏆 All-Time Referral Leaderboard</h2>

        {/* Current user */}
        {user && (
          <div style={{
            background: '#1a2e1f',
            border: '1px solid #4ade80',
            borderRadius: '12px',
            padding: '12px 14px',
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}>
            <div style={{ fontSize: '20px' }}>😎</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '13px', fontWeight: 800 }}>@{user.username} (You)</div>
              <div style={{ fontSize: '10px', color: '#888' }}>Your rank: —</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '13px', fontWeight: 900, color: '#4ade80' }}>{totalReferrals}</div>
              <div style={{ fontSize: '9px', color: '#666' }}>referrals</div>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {DEMO_LEADERBOARD.map(r => (
            <div key={r.rank} style={{
              background: '#141414',
              border: '1px solid #2a2a2a',
              borderRadius: '12px',
              padding: '12px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}>
              <div style={{
                width: '24px',
                fontSize: '14px',
                fontWeight: 900,
                color: r.rank <= 3 ? '#ffd700' : '#666',
              }}>
                #{r.rank}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '13px', fontWeight: 800 }}>{r.username}</div>
                <div style={{ fontSize: '10px', color: '#888' }}>{r.referrals} referrals</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '13px', fontWeight: 900, color: '#4ade80' }}>
                  {r.coins.toLocaleString()}
                </div>
                <div style={{ fontSize: '9px', color: '#666' }}>coins</div>
              </div>
            </div>
          ))}
        </div>

        {/* My Referrals */}
        {referrals.length > 0 && (
          <>
            <h2 style={{ fontSize: '16px', fontWeight: 900, marginTop: '24px', marginBottom: '12px' }}>
              📋 Your Referrals
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {referrals.map(r => (
                <div key={r.userId} style={{
                  background: '#141414',
                  border: '1px solid #2a2a2a',
                  borderRadius: '10px',
                  padding: '10px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}>
                  <div style={{ fontSize: '20px' }}>👤</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13px', fontWeight: 700 }}>@{r.username}</div>
                    <div style={{ fontSize: '10px', color: '#666' }}>
                      {r.hasCreatedToken ? '✅ Token created' : '⏳ Pending token'}
                    </div>
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 800, color: r.pointsEarned > 0 ? '#4ade80' : '#666' }}>
                    +{r.pointsEarned.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

import DailyStreak from '../components/DailyStreak';
import Achievements from '../components/Achievements';
import DailyTasks from '../components/DailyTasks';
import RewardsBalance from '../components/RewardsBalance';

export default function Rewards() {
  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', margin: '-16px', padding: '20px 16px 100px 0', color: '#fff' }}>
      <div style={{ padding: '0 16px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '4px' }}>
          🎁 Rewards
        </h1>
        <p style={{ fontSize: '13px', color: '#888', marginBottom: '20px' }}>
          Earn ton.fun coins by creating tokens, trading, and completing tasks
        </p>

        <RewardsBalance />
        <DailyStreak />
        <DailyTasks />
        <Achievements />

        <div style={{ marginTop: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 900, marginBottom: '12px' }}>
            🏆 All-Time Leaderboard Rewards
          </h3>
          <div style={{
            background: 'linear-gradient(135deg, #ffd700 0%, #b8860b 100%)',
            borderRadius: '16px',
            padding: '20px',
            textAlign: 'center',
            color: '#0a0a0a',
          }}>
            <div style={{ fontSize: '48px', marginBottom: '8px' }}>🥇</div>
            <div style={{ fontSize: '18px', fontWeight: 900, marginBottom: '4px' }}>
              1,000,000 Coins Prize Pool
            </div>
            <div style={{ fontSize: '12px', opacity: 0.8, marginBottom: '16px' }}>
              Top 10 traders share the pool (all-time)
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '12px', fontWeight: 700 }}>
              <div>
                <div>🥇 400K</div>
                <div style={{ fontSize: '10px', opacity: 0.7, fontWeight: 400 }}>Rank 1</div>
              </div>
              <div>
                <div>🥈 250K</div>
                <div style={{ fontSize: '10px', opacity: 0.7, fontWeight: 400 }}>Rank 2</div>
              </div>
              <div>
                <div>🥉 150K</div>
                <div style={{ fontSize: '10px', opacity: 0.7, fontWeight: 400 }}>Rank 3</div>
              </div>
              <div>
                <div>🎁 200K</div>
                <div style={{ fontSize: '10px', opacity: 0.7, fontWeight: 400 }}>Ranks 4-10</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

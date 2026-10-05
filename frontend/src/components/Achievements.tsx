import { ALL_ACHIEVEMENTS, getUnlockedAchievements, getProgress } from '../hooks/useAchievements';
import { useDailyStreak } from '../hooks/useDailyStreak';

export default function Achievements() {
  const { data } = useDailyStreak();

  // Demo stats — baad mein real data
  const stats = {
    trades: 12,
    tokens: 2,
    streak: data.currentStreak,
    profit: 500,
  };

  const unlocked = getUnlockedAchievements(stats);
  const unlockedIds = unlocked.map(a => a.id);

  return (
    <div style={{ padding: '16px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 900 }}>
          🏅 Achievements
        </h3>
        <span style={{ fontSize: '12px', color: '#888', fontWeight: 700 }}>
          {unlocked.length}/{ALL_ACHIEVEMENTS.length}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
        {ALL_ACHIEVEMENTS.map(a => {
          const isUnlocked = unlockedIds.includes(a.id);
          const progress = getProgress(a, stats);
          return (
            <div
              key={a.id}
              style={{
                background: isUnlocked ? '#1a2e1f' : '#141414',
                border: isUnlocked ? '1px solid #4ade80' : '1px solid #2a2a2a',
                borderRadius: '12px',
                padding: '12px 8px',
                textAlign: 'center',
                opacity: isUnlocked ? 1 : 0.6,
                position: 'relative',
              }}
            >
              <div style={{ fontSize: '28px', marginBottom: '6px', filter: isUnlocked ? 'none' : 'grayscale(1)' }}>
                {a.icon}
              </div>
              <div style={{ fontSize: '10px', fontWeight: 800, color: isUnlocked ? '#4ade80' : '#888', marginBottom: '2px' }}>
                {a.title}
              </div>
              <div style={{ fontSize: '9px', color: '#666', lineHeight: 1.2 }}>
                {a.description}
              </div>

              {!isUnlocked && (
                <div style={{
                  marginTop: '6px',
                  height: '3px',
                  background: '#2a2a2a',
                  borderRadius: '2px',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    height: '100%',
                    width: `${progress}%`,
                    background: '#4ade80',
                    transition: 'width 0.3s',
                  }} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

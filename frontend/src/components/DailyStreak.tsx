import { useState } from 'react';
import { useDailyStreak } from '../hooks/useDailyStreak';
import { playSound } from '../utils/sound';

export default function DailyStreak() {
  const { data, canClaim, claim } = useDailyStreak();
  const [showReward, setShowReward] = useState<number | null>(null);

  const handleClaim = () => {
    const reward = claim();
    if (reward !== null) {
      playSound('cash');
      setShowReward(reward);
      setTimeout(() => setShowReward(null), 2500);
    }
  };

  const days = [1, 2, 3, 4, 5, 6, 7];

  return (
    <div style={{
      background: 'linear-gradient(135deg, #1b5e20 0%, #0a0a0a 100%)',
      border: '1px solid #2a2a2a',
      borderRadius: '16px',
      padding: '16px',
      marginBottom: '16px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '20px' }}>🔥</span>
            <span style={{ fontSize: '14px', fontWeight: 900, color: '#fff' }}>
              Daily Streak
            </span>
          </div>
          <div style={{ fontSize: '11px', color: '#888', marginTop: '2px' }}>
            {data.currentStreak} day{data.currentStreak !== 1 ? 's' : ''} · {data.totalClaims} total
          </div>
        </div>
        <div style={{
          fontSize: '28px',
          fontWeight: 900,
          color: '#4ade80',
        }}>
          {data.currentStreak}
        </div>
      </div>

      {/* Days */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '12px' }}>
        {days.map(d => {
          const claimed = d <= data.currentStreak;
          const isNext = d === data.currentStreak + 1;
          return (
            <div
              key={d}
              style={{
                flex: 1,
                aspectRatio: '1',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
                fontWeight: 700,
                background: claimed ? '#4ade80' : isNext ? '#2a2a2a' : '#1a1a1a',
                color: claimed ? '#0a0a0a' : isNext ? '#4ade80' : '#555',
                border: isNext ? '1px dashed #4ade80' : '1px solid transparent',
              }}
            >
              {claimed ? '✓' : d}
            </div>
          );
        })}
      </div>

      <button
        onClick={handleClaim}
        disabled={!canClaim}
        style={{
          width: '100%',
          padding: '10px',
          background: canClaim ? '#4ade80' : '#2a2a2a',
          color: canClaim ? '#0a0a0a' : '#555',
          border: 'none',
          borderRadius: '10px',
          fontWeight: 800,
          fontSize: '13px',
          cursor: canClaim ? 'pointer' : 'not-allowed',
        }}
      >
        {canClaim ? '🎁 Claim Daily Reward' : '✅ Claimed Today'}
      </button>

      {showReward !== null && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.85)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'popIn 0.3s ease-out',
        }}>
          <style>{`@keyframes popIn { 0% { opacity: 0; transform: scale(0.8); } 100% { opacity: 1; transform: scale(1); } }`}</style>
          <div style={{ fontSize: '48px', marginBottom: '8px' }}>🎉</div>
          <div style={{ fontSize: '24px', fontWeight: 900, color: '#4ade80' }}>
            +{showReward} TON
          </div>
          <div style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>
            Daily reward claimed!
          </div>
        </div>
      )}
    </div>
  );
}

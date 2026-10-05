import { useState, useEffect } from 'react';

interface StreakData {
  currentStreak: number;
  lastClaimDate: string;
  totalClaims: number;
}

export function useDailyStreak() {
  const [data, setData] = useState<StreakData>({
    currentStreak: 0,
    lastClaimDate: '',
    totalClaims: 0,
  });
  const [canClaim, setCanClaim] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const stored = localStorage.getItem('tonfun_streak');
    if (stored) {
      try {
        const parsed: StreakData = JSON.parse(stored);
        setData(parsed);
        setCanClaim(parsed.lastClaimDate !== today);
      } catch {}
    } else {
      setCanClaim(true);
    }
  }, [today]);

  const claim = () => {
    if (!canClaim) return null;

    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    const newStreak = data.lastClaimDate === yesterday ? data.currentStreak + 1 : 1;

    const newData: StreakData = {
      currentStreak: newStreak,
      lastClaimDate: today,
      totalClaims: data.totalClaims + 1,
    };

    setData(newData);
    setCanClaim(false);
    localStorage.setItem('tonfun_streak', JSON.stringify(newData));

    // Reward
    const reward = Math.min(newStreak * 10, 100);
    return reward;
  };

  return { data, canClaim, claim };
}

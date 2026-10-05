export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  requirement: number;
  type: 'trades' | 'tokens' | 'streak' | 'profit';
}

export const ALL_ACHIEVEMENTS: Achievement[] = [
  { id: 'first_trade', title: 'First Steps', description: 'Complete your first trade', icon: '🎯', requirement: 1, type: 'trades' },
  { id: 'trader_10', title: 'Active Trader', description: 'Complete 10 trades', icon: '📈', requirement: 10, type: 'trades' },
  { id: 'trader_100', title: 'Pro Trader', description: 'Complete 100 trades', icon: '🏆', requirement: 100, type: 'trades' },
  { id: 'creator_1', title: 'Creator', description: 'Launch your first token', icon: '🚀', requirement: 1, type: 'tokens' },
  { id: 'creator_5', title: 'Serial Creator', description: 'Launch 5 tokens', icon: '🌟', requirement: 5, type: 'tokens' },
  { id: 'streak_7', title: 'Weekly Warrior', description: '7-day login streak', icon: '🔥', requirement: 7, type: 'streak' },
  { id: 'streak_30', title: 'Monthly Master', description: '30-day login streak', icon: '👑', requirement: 30, type: 'streak' },
];

interface UserStats {
  trades: number;
  tokens: number;
  streak: number;
  profit: number;
}

export function getUnlockedAchievements(stats: UserStats): Achievement[] {
  return ALL_ACHIEVEMENTS.filter(a => {
    if (a.type === 'trades') return stats.trades >= a.requirement;
    if (a.type === 'tokens') return stats.tokens >= a.requirement;
    if (a.type === 'streak') return stats.streak >= a.requirement;
    if (a.type === 'profit') return stats.profit >= a.requirement;
    return false;
  });
}

export function getProgress(achievement: Achievement, stats: UserStats): number {
  let current = 0;
  if (achievement.type === 'trades') current = stats.trades;
  if (achievement.type === 'tokens') current = stats.tokens;
  if (achievement.type === 'streak') current = stats.streak;
  if (achievement.type === 'profit') current = stats.profit;
  return Math.min((current / achievement.requirement) * 100, 100);
}

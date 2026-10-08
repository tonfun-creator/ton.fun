import { useState, useEffect } from 'react';

export type RewardType =
  | 'token_create'
  | 'buy'
  | 'sell'
  | 'daily'
  | 'tg_channel'
  | 'tg_group'
  | 'x_follow'
  | 'x_engage'
  | 'referral'
  | 'bonus';

export const REWARD_VALUES: Record<RewardType, number> = {
  token_create: 10000,
  buy: 1000,
  sell: 500,
  daily: 1000,
  tg_channel: 1000,
  tg_group: 1000,
  x_follow: 1000,
  x_engage: 2500,
  referral: 5000,
  bonus: 0,
};

export interface RewardTransaction {
  id: string;
  type: RewardType;
  coins: number;
  description: string;
  timestamp: number;
}

interface RewardsData {
  balance: number;
  totalEarned: number;
  transactions: RewardTransaction[];
  completedTasks: string[];
}

const STORAGE_KEY = 'tonfun_coins_v1';

export function useRewards() {
  const [data, setData] = useState<RewardsData>({
    balance: 0,
    totalEarned: 0,
    transactions: [],
    completedTasks: [],
  });

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try { setData(JSON.parse(stored)); } catch {}
    }
  }, []);

  const save = (newData: RewardsData) => {
    setData(newData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  };

  const addReward = (type: RewardType, coins: number, description: string) => {
    const tx: RewardTransaction = {
      id: Date.now().toString() + Math.random(),
      type,
      coins,
      description,
      timestamp: Date.now(),
    };
    save({
      balance: data.balance + coins,
      totalEarned: data.totalEarned + coins,
      transactions: [tx, ...data.transactions].slice(0, 100),
      completedTasks: data.completedTasks,
    });
    return tx;
  };

  const completeTask = (taskId: string, type: RewardType, description: string) => {
    if (data.completedTasks.includes(taskId)) return false;
    const coins = REWARD_VALUES[type];
    const tx: RewardTransaction = {
      id: Date.now().toString() + Math.random(),
      type,
      coins,
      description,
      timestamp: Date.now(),
    };
    save({
      balance: data.balance + coins,
      totalEarned: data.totalEarned + coins,
      transactions: [tx, ...data.transactions].slice(0, 100),
      completedTasks: [...data.completedTasks, taskId],
    });
    return true;
  };

  const hasCompleted = (taskId: string) => data.completedTasks.includes(taskId);

  return { data, addReward, completeTask, hasCompleted, REWARD_VALUES };
}

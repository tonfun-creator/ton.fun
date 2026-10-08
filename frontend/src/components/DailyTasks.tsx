import { useRewards, type RewardType } from '../hooks/useRewards';
import { playSound } from '../utils/sound';

interface Task {
  id: string;
  title: string;
  description: string;
  icon: string;
  type: RewardType;
  coins: number;
  link?: string;
}

const TASKS: Task[] = [
  { id: 'daily_login', title: 'Daily Login', description: 'Open app daily', icon: '📅', type: 'daily', coins: 1000 },
  { id: 'join_tg_channel', title: 'Join Telegram Channel', description: 'Follow official channel', icon: '📢', type: 'tg_channel', coins: 1000, link: 'https://t.me/tonfun_officialBot' },
  { id: 'join_tg_group', title: 'Join Telegram Group', description: 'Join community chat', icon: '💬', type: 'tg_group', coins: 1000, link: 'https://t.me/tonfun_officialBot' },
  { id: 'follow_x', title: 'Follow on X', description: 'Follow @tonfun on X', icon: '𝕏', type: 'x_follow', coins: 1000, link: 'https://x.com' },
  { id: 'engage_x', title: 'Like + Repost + Comment', description: 'Engage with pinned post on X', icon: '❤️', type: 'x_engage', coins: 2500, link: 'https://x.com' },
  { id: 'create_token', title: 'Launch a Token', description: 'Create your first meme coin', icon: '🚀', type: 'token_create', coins: 10000 },
  { id: 'buy_token', title: 'Buy a Token', description: 'Buy any token on ton.fun', icon: '💰', type: 'buy', coins: 1000 },
  { id: 'sell_token', title: 'Sell a Token', description: 'Sell any token you hold', icon: '💸', type: 'sell', coins: 500 },
];

export default function DailyTasks() {
  const { completeTask, hasCompleted } = useRewards();

  const handleTask = (task: Task) => {
    if (hasCompleted(task.id)) return;
    playSound('success');
    if (task.link) window.open(task.link, '_blank');
    completeTask(task.id, task.type, task.title);
  };

  const completedCount = TASKS.filter(t => hasCompleted(t.id)).length;

  return (
    <div style={{ marginBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#fff' }}>✅ Tasks</h3>
        <span style={{ fontSize: '12px', color: '#888', fontWeight: 700 }}>
          {completedCount}/{TASKS.length}
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {TASKS.map(t => {
          const done = hasCompleted(t.id);
          return (
            <div
              key={t.id}
              onClick={() => handleTask(t)}
              style={{
                background: done ? '#1a2e1f' : '#141414',
                border: done ? '1px solid #4ade80' : '1px solid #2a2a2a',
                borderRadius: '12px',
                padding: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: done ? 'default' : 'pointer',
                opacity: done ? 0.7 : 1,
              }}
            >
              <div style={{ fontSize: '24px' }}>{t.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#fff', marginBottom: '2px' }}>{t.title}</div>
                <div style={{ fontSize: '11px', color: '#888' }}>{t.description}</div>
              </div>
              <div style={{
                background: done ? '#4ade80' : '#1a1a1a',
                color: done ? '#0a0a0a' : '#4ade80',
                padding: '4px 10px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 900,
                whiteSpace: 'nowrap',
              }}>
                {done ? '✓' : `+${t.coins.toLocaleString()}`}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

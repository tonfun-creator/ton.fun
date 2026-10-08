import { useRewards } from '../hooks/useRewards';

export default function RewardsBalance() {
  const { data } = useRewards();

  const formatTime = (ts: number) => {
    const diff = Date.now() - ts;
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'token_create': return '🚀';
      case 'buy': return '💰';
      case 'sell': return '💸';
      case 'daily': return '📅';
      case 'tg_channel': return '📢';
      case 'tg_group': return '💬';
      case 'x_follow': return '𝕏';
      case 'x_engage': return '❤️';
      case 'referral': return '👥';
      case 'bonus': return '🎁';
      default: return '⭐';
    }
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <div style={{
        background: 'linear-gradient(135deg, #4ade80 0%, #1b5e20 100%)',
        borderRadius: '16px',
        padding: '24px 20px',
        color: '#fff',
        marginBottom: '16px',
      }}>
        <div style={{ fontSize: '11px', opacity: 0.8, fontWeight: 700, letterSpacing: '1px' }}>
          TON.FUN COINS
        </div>
        <div style={{ fontSize: '38px', fontWeight: 900, letterSpacing: '-1.5px', marginTop: '4px' }}>
          {data.balance.toLocaleString()}
        </div>
        <div style={{ fontSize: '12px', opacity: 0.9, marginTop: '4px' }}>
          Total earned: {data.totalEarned.toLocaleString()} coins
        </div>
      </div>

      {data.transactions.length > 0 && (
        <>
          <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#fff', marginBottom: '12px' }}>
            📜 Recent Activity
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {data.transactions.slice(0, 10).map(tx => (
              <div key={tx.id} style={{
                background: '#141414',
                border: '1px solid #2a2a2a',
                borderRadius: '10px',
                padding: '10px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}>
                <div style={{ fontSize: '20px' }}>{getIcon(tx.type)}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {tx.description}
                  </div>
                  <div style={{ fontSize: '10px', color: '#666' }}>
                    {formatTime(tx.timestamp)}
                  </div>
                </div>
                <div style={{
                  fontSize: '14px',
                  fontWeight: 900,
                  color: tx.coins > 0 ? '#4ade80' : '#ef4444',
                }}>
                  {tx.coins > 0 ? '+' : ''}{tx.coins.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {data.transactions.length === 0 && (
        <div style={{
          background: '#141414',
          border: '1px dashed #2a2a2a',
          borderRadius: '12px',
          padding: '30px 20px',
          textAlign: 'center',
          color: '#666',
          fontSize: '13px',
        }}>
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>🪙</div>
          Complete tasks to earn ton.fun coins!
        </div>
      )}
    </div>
  );
}

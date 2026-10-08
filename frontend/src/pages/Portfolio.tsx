import { Link } from 'react-router-dom';
import { useWallet } from '../hooks/useWallet';

const DEMO_HOLDINGS = [
  { address: 'EQD1', name: 'Doge Killer', symbol: 'DOGEK', emoji: '🐕', amount: '1,250,000', value: '$12.50', profit: '+45%', isPositive: true },
  { address: 'EQD2', name: 'Pepe TON', symbol: 'PEPET', emoji: '🐸', amount: '500,000', value: '$8.20', profit: '+120%', isPositive: true },
  { address: 'EQD3', name: 'Moon Coin', symbol: 'MOON', emoji: '🌙', amount: '100,000', value: '$5.10', profit: '-12%', isPositive: false },
];

export default function Portfolio() {
  const { shortAddress, isConnected, disconnect } = useWallet();

  if (!isConnected) {
    return (
      <div style={{ background: 'var(--bg)', margin: '-16px', padding: '60px 20px', minHeight: '100vh', textAlign: 'center' }}>
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>👛</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 900, color: 'var(--fg)', marginBottom: '8px' }}>
          Connect Wallet
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '20px' }}>
          Apna wallet connect karein taake aap apni holdings dekh sakein
        </p>
      </div>
    );
  }

  const totalValue = 25.80;

  return (
    <div style={{ background: 'var(--bg)', margin: '-16px', padding: '20px 16px 100px', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 900, color: 'var(--fg)' }}>
          Portfolio
        </h1>
        <button
          onClick={disconnect}
          style={{
            background: 'var(--surface-2)',
            color: 'var(--fg)',
            border: '3px solid var(--hard)',
            borderRadius: '10px',
            padding: '8px 12px',
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '12px',
            boxShadow: '3px 3px 0 var(--hard)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--up)' }} />
          {shortAddress}
        </button>
      </div>

      <div style={{
        background: 'linear-gradient(135deg, var(--accent) 0%, #0a6aa6 100%)',
        borderRadius: '16px',
        padding: '24px 20px',
        marginBottom: '16px',
        border: '3px solid var(--hard)',
        boxShadow: '4px 4px 0 var(--hard)',
        color: '#fff',
      }}>
        <div style={{ fontSize: '11px', opacity: 0.85, fontWeight: 700, letterSpacing: '1px' }}>TOTAL VALUE</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '42px', fontWeight: 900, letterSpacing: '-1.5px', marginTop: '4px' }}>
          ${totalValue.toFixed(2)}
        </div>
        <div style={{ fontSize: '13px', marginTop: '6px', fontWeight: 600 }}>↑ +$3.45 (+15.4%)</div>
      </div>

      <div style={{
        background: 'var(--surface)',
        border: '3px solid var(--hard)',
        borderRadius: '14px',
        padding: '14px 16px',
        marginBottom: '20px',
        boxShadow: '3px 3px 0 var(--hard)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '40px', height: '40px',
            background: 'var(--accent)',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '20px',
            border: '2px solid var(--hard)',
          }}>💎</div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 700 }}>TON BALANCE</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 900, color: 'var(--fg)' }}>3.44 TON</div>
          </div>
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '14px', fontWeight: 800, color: 'var(--up)' }}>$5.26</div>
      </div>

      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 900, color: 'var(--fg)', marginBottom: '12px' }}>
        Your Holdings ({DEMO_HOLDINGS.length})
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {DEMO_HOLDINGS.map(h => (
          <Link key={h.address} to={`/token/${h.address}`} style={{
            background: 'var(--surface)',
            border: '3px solid var(--hard)',
            borderRadius: '14px',
            padding: '14px',
            boxShadow: '3px 3px 0 var(--hard)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textDecoration: 'none',
            color: 'var(--fg)',
          }}>
            <div style={{
              width: '42px', height: '42px',
              background: 'var(--surface-2)',
              border: '2px solid var(--hard)',
              borderRadius: '10px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '22px',
            }}>{h.emoji}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '14px' }}>{h.name}</div>
              <div style={{ fontSize: '11px', color: 'var(--muted)' }}>{h.symbol} · {h.amount}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '14px' }}>{h.value}</div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: h.isPositive ? 'var(--up)' : 'var(--down)' }}>{h.profit}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

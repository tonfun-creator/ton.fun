import { useEffect, useState } from 'react';
import { playSound } from '../utils/sound';

interface RewardToastProps {
  coins: number;
  message: string;
  show: boolean;
  onComplete?: () => void;
}

export default function RewardToast({ coins, message, show, onComplete }: RewardToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      playSound('cash');
      const timer = setTimeout(() => {
        setVisible(false);
        onComplete?.();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!visible) return null;

  return (
    <>
      <style>{`
        @keyframes slideDown {
          0% { opacity: 0; transform: translate(-50%, -20px); }
          15% { opacity: 1; transform: translate(-50%, 0); }
          85% { opacity: 1; transform: translate(-50%, 0); }
          100% { opacity: 0; transform: translate(-50%, -20px); }
        }
      `}</style>
      <div style={{
        position: 'fixed',
        top: '80px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'linear-gradient(135deg, #4ade80 0%, #1b5e20 100%)',
        color: '#fff',
        padding: '12px 20px',
        borderRadius: '999px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontWeight: 800,
        fontSize: '14px',
        zIndex: 9999,
        boxShadow: '0 8px 24px rgba(74,222,128,0.4)',
        animation: 'slideDown 2.5s ease-out forwards',
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
      }}>
        <span style={{ fontSize: '18px' }}>🪙</span>
        <span>+{coins.toLocaleString()}</span>
        <span style={{ fontSize: '12px', opacity: 0.9 }}>· {message}</span>
      </div>
    </>
  );
}

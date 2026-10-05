import { useEffect, useState } from 'react';
import Logo from './Logo';

interface SplashProps {
  onComplete: () => void;
}

export default function Splash({ onComplete }: SplashProps) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 1800);
    const completeTimer = setTimeout(() => onComplete(), 2200);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className={`splash ${fadeOut ? 'fade-out' : ''}`}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
      }}>
        <Logo size={140} showText={false} />
        <h1 style={{
          fontSize: '48px',
          fontWeight: 900,
          letterSpacing: '-2px',
          color: '#0a0a0a',
          margin: 0,
        }}>
          ton.fun
        </h1>
      </div>
    </div>
  );
}

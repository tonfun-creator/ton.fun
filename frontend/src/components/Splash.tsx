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
      <div className="splash-logo">
        <Logo size={140} showText={false} />
        <h1 className="splash-text">ton.fun</h1>
      </div>
    </div>
  );
}

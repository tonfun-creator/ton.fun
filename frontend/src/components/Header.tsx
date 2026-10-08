import { Link } from 'react-router-dom';
import { TonConnectButton } from '@tonconnect/ui-react';
import Logo from './Logo';
import { useTheme } from '../hooks/useTheme';

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <Link to="/" className="header-logo">
        <Logo size={38} />
      </Link>

      <div className="header-nav">
        <button className="theme-btn" onClick={toggleTheme} title="Toggle theme">
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
        <TonConnectButton />
      </div>
    </header>
  );
}

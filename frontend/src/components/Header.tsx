import { Link } from 'react-router-dom';
import { TonConnectButton } from '@tonconnect/ui-react';
import Logo from './Logo';

export default function Header() {
  return (
    <header className="header">
      <Link to="/" className="header-logo">
        <Logo size={40} />
      </Link>
      <div className="header-nav">
        <Link to="/create" className="nav-btn secondary">+ Create</Link>
        <TonConnectButton />
      </div>
    </header>
  );
}

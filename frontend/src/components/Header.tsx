import { Link } from 'react-router-dom';
import { TonConnectButton, useTonAddress } from '@tonconnect/ui-react';
import Logo from './Logo';
import WalletInfo from './WalletInfo';

export default function Header() {
  const userAddress = useTonAddress();

  return (
    <header className="header">
      <Link to="/" className="header-logo">
        <Logo size={38} />
      </Link>
      <div className="header-nav">
        <Link to="/create" className="nav-btn secondary">+ Create</Link>
        {userAddress ? <WalletInfo /> : <TonConnectButton />}
      </div>
    </header>
  );
}

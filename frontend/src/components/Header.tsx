import { Link } from 'react-router-dom';
import Logo from './Logo';

export default function Header() {
  return (
    <header className="header">
      <Link to="/" className="header-logo">
        <Logo size={38} />
      </Link>
      <div className="header-nav">
        <Link to="/create" className="nav-btn secondary">+ Create</Link>
        <button className="nav-btn">
          Connect Wallet
        </button>
      </div>
    </header>
  );
}

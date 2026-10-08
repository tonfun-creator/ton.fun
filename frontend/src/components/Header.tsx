import { Link } from 'react-router-dom';
import Logo from './Logo';
import { useTelegramUser } from '../hooks/useTelegramUser';

export default function Header() {
  const { user, isLinked } = useTelegramUser();

  return (
    <header className="header">
      <Link to="/" className="header-logo">
        <Logo size={38} />
      </Link>

      <div className="header-nav">
        {isLinked && user ? (
          <Link to="/profile" className="user-chip">
            <span className="user-dot" />
            @{user.username}
          </Link>
        ) : (
          <span className="user-chip guest">
            Not linked
          </span>
        )}
      </div>
    </header>
  );
}

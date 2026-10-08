import { Link } from 'react-router-dom';
import Logo from './Logo';
import { useTelegramUser } from '../hooks/useTelegramUser';
import { useTheme } from '../hooks/useTheme';

export default function Header() {
  const { user, isLinked } = useTelegramUser();
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

        {isLinked && user ? (
          <Link to="/profile" className="user-chip">
            <span className="user-dot" />
            @{user.username}
          </Link>
        ) : (
          <span className="user-chip guest">Not linked</span>
        )}
      </div>
    </header>
  );
}

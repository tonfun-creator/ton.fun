import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Header from './components/Header';
import SupportChat from './components/SupportChat';
import Home from './pages/Home';
import Create from './pages/Create';
import TokenDetail from './pages/TokenDetail';
import Portfolio from './pages/Portfolio';
import Leaderboard from './pages/Leaderboard';
import Trending from './pages/Trending';
import Profile from './pages/Profile';
import TopCallers from './pages/TopCallers';
import Rewards from './pages/Rewards';
import Referrals from './pages/Referrals';
import Privacy from './pages/Privacy';

function BottomNav() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bottom-nav">
      <Link to="/" className={`bottom-nav-item ${isActive('/') ? 'active' : ''}`}>🏠</Link>
      <Link to="/trending" className={`bottom-nav-item ${isActive('/trending') ? 'active' : ''}`}>🔥</Link>
      <Link to="/rewards" className={`bottom-nav-item ${isActive('/rewards') ? 'active' : ''}`}>🎁</Link>
      <Link to="/referrals" className={`bottom-nav-item ${isActive('/referrals') ? 'active' : ''}`}>👥</Link>
      <Link to="/create" className={`bottom-nav-item ${isActive('/create') ? 'active' : ''}`}>➕</Link>
    </nav>
  );
}

export default function App() {
  return (
    <div className="app">
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/top-callers" element={<TopCallers />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/referrals" element={<Referrals />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/token/:address" element={<TokenDetail />} />
        </Routes>
      </main>
      <BottomNav />
      <SupportChat />
    </div>
  );
}

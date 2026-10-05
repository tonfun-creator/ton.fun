import { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Create from './pages/Create';
import TokenDetail from './pages/TokenDetail';
import Portfolio from './pages/Portfolio';
import Splash from './components/Splash';

function BottomNav() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bottom-nav">
      <Link to="/" className={`bottom-nav-item ${isActive('/') ? 'active' : ''}`}>🏠</Link>
      <Link to="/portfolio" className={`bottom-nav-item ${isActive('/portfolio') ? 'active' : ''}`}>👛</Link>
      <Link to="/create" className={`bottom-nav-item ${isActive('/create') ? 'active' : ''}`}>➕</Link>
    </nav>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <Splash onComplete={() => setShowSplash(false)} />;
  }

  return (
    <div className="app">
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/token/:address" element={<TokenDetail />} />
        </Routes>
      </main>
      <BottomNav />
    </div>
  );
}

export default App;

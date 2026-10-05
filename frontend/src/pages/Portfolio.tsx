import { useTonAddress } from '@tonconnect/ui-react';
import { Link } from 'react-router-dom';

const DEMO_HOLDINGS = [
  { address: 'EQD1', name: 'Doge Killer', symbol: 'DOGEK', emoji: '🐕', amount: '1,250,000', value: '$12.50', profit: '+45%', isPositive: true },
  { address: 'EQD2', name: 'Pepe TON', symbol: 'PEPET', emoji: '🐸', amount: '500,000', value: '$8.20', profit: '+120%', isPositive: true },
  { address: 'EQD3', name: 'Moon Coin', symbol: 'MOON', emoji: '🌙', amount: '100,000', value: '$5.10', profit: '-12%', isPositive: false },
];

export default function Portfolio() {
  const userAddress = useTonAddress();

  if (!userAddress) {
    return (
      <div className="portfolio-empty">
        <div className="portfolio-empty-icon">👛</div>
        <h2 className="portfolio-empty-title">Connect Wallet</h2>
        <p className="portfolio-empty-text">
          Apna wallet connect karein taake aap apni holdings dekh sakein
        </p>
      </div>
    );
  }

  const shortAddress = `${userAddress.slice(0, 4)}...${userAddress.slice(-4)}`;
  const totalValue = 25.80;

  return (
    <div className="portfolio-page">
      <div className="portfolio-header">
        <h1 className="portfolio-title">Portfolio</h1>
        <div className="portfolio-wallet">
          <span className="wallet-dot" />
          {shortAddress}
        </div>
      </div>

      <div className="portfolio-value-card">
        <div className="portfolio-value-label">Total Value</div>
        <div className="portfolio-value">${totalValue.toFixed(2)}</div>
        <div className="portfolio-value-change">
          <span className="green">↑ +$3.45</span>
          <span className="change-pct">+15.4%</span>
        </div>
      </div>

      <div className="portfolio-ton-balance">
        <div className="ton-balance-left">
          <div className="ton-icon">💎</div>
          <div>
            <div className="ton-label">TON Balance</div>
            <div className="ton-amount">3.44 GRAM</div>
          </div>
        </div>
        <div className="ton-value">$5.26</div>
      </div>

      <div className="portfolio-section">
        <div className="portfolio-section-header">
          <h2>Your Holdings</h2>
          <span className="holdings-count">{DEMO_HOLDINGS.length}</span>
        </div>

        <div className="holdings-list">
          {DEMO_HOLDINGS.map((h) => (
            <Link key={h.address} to={`/token/${h.address}`} className="holding-item">
              <div className="holding-emoji">{h.emoji}</div>
              <div className="holding-info">
                <div className="holding-name">{h.name}</div>
                <div className="holding-symbol">{h.symbol} · {h.amount}</div>
              </div>
              <div className="holding-right">
                <div className="holding-value">{h.value}</div>
                <div className={`holding-profit ${h.isPositive ? 'up' : 'down'}`}>{h.profit}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

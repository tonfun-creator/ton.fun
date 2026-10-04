import { Link } from 'react-router-dom';

interface TokenCardProps {
  address: string;
  name: string;
  symbol: string;
  marketCap: string;
  change: string;
  emoji?: string;
}

export default function TokenCard({ address, name, symbol, marketCap, change, emoji = '🪙' }: TokenCardProps) {
  const isPositive = !change.startsWith('-');
  return (
    <Link to={`/token/${address}`} className="token-card">
      <div className="token-card-img">{emoji}</div>
      <div className="token-card-name">{name}</div>
      <div className="token-card-symbol">{symbol}</div>
      <div className="token-card-stats">
        <div>
          <div className="token-card-stat-label">MCAP</div>
          <div className="token-card-stat-value">${marketCap}</div>
        </div>
        <div>
          <div className="token-card-stat-label">24h</div>
          <div className={`token-card-stat-value ${isPositive ? 'up' : ''}`}>{change}</div>
        </div>
      </div>
    </Link>
  );
}

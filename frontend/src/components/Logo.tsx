interface LogoProps {
  size?: number;
  showText?: boolean;
}

export default function Logo({ size = 32, showText = true }: LogoProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 100 185 L 15 80 L 185 80 Z" fill="#1b5e20" stroke="#1a1a1a" strokeWidth="7" strokeLinejoin="round" />
        <path d="M 15 80 L 55 20 L 145 20 L 185 80 Z" fill="#ffffff" stroke="#1a1a1a" strokeWidth="7" strokeLinejoin="round" />
        <line x1="100" y1="20" x2="100" y2="80" stroke="#1a1a1a" strokeWidth="7" strokeLinecap="round" />
        <line x1="100" y1="80" x2="100" y2="185" stroke="#1a1a1a" strokeWidth="7" strokeLinecap="round" />
        <line x1="55" y1="20" x2="100" y2="80" stroke="#1a1a1a" strokeWidth="7" strokeLinecap="round" />
        <line x1="145" y1="20" x2="100" y2="80" stroke="#1a1a1a" strokeWidth="7" strokeLinecap="round" />
        <line x1="15" y1="80" x2="100" y2="185" stroke="#1a1a1a" strokeWidth="7" strokeLinecap="round" />
        <line x1="185" y1="80" x2="100" y2="185" stroke="#1a1a1a" strokeWidth="7" strokeLinecap="round" />
      </svg>
      {showText && (
        <span style={{ fontSize: '22px', fontWeight: 900, letterSpacing: '-0.5px', color: '#0a0a0a' }}>
          ton.fun
        </span>
      )}
    </div>
  );
}

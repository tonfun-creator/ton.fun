interface LogoProps {
  size?: number;
  showText?: boolean;
}

export default function Logo({ size = 32, showText = true }: LogoProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <img
        src="/191977.png"
        alt="ton.fun"
        width={size}
        height={size}
        style={{ objectFit: 'contain' }}
      />
      {showText && (
        <span
          style={{
            fontSize: '22px',
            fontWeight: 900,
            letterSpacing: '-0.5px',
            color: '#0a0a0a',
          }}
        >
          ton.fun
        </span>
      )}
    </div>
  );
}

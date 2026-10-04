interface LogoProps {
  size?: number;
  showText?: boolean;
}

export default function Logo({ size = 32, showText = true }: LogoProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Bottom half - dark green */}
        <path
          d="M 100 175 L 20 75 L 180 75 Z"
          fill="#1b5e20"
          stroke="#0a0a0a"
          strokeWidth="8"
          strokeLinejoin="round"
        />

        {/* Top half - white */}
        <path
          d="M 20 75 L 55 15 L 145 15 L 180 75 Z"
          fill="#ffffff"
          stroke="#0a0a0a"
          strokeWidth="8"
          strokeLinejoin="round"
        />

        {/* Center vertical line top */}
        <line
          x1="100"
          y1="15"
          x2="100"
          y2="75"
          stroke="#0a0a0a"
          strokeWidth="8"
        />

        {/* Center vertical line bottom */}
        <line
          x1="100"
          y1="75"
          x2="100"
          y2="175"
          stroke="#0a0a0a"
          strokeWidth="8"
        />

        {/* Left diagonal (top section) */}
        <line
          x1="55"
          y1="15"
          x2="100"
          y2="75"
          stroke="#0a0a0a"
          strokeWidth="8"
        />

        {/* Right diagonal (top section) */}
        <line
          x1="145"
          y1="15"
          x2="100"
          y2="75"
          stroke="#0a0a0a"
          strokeWidth="8"
        />

        {/* Left diagonal (bottom section) */}
        <line
          x1="20"
          y1="75"
          x2="100"
          y2="175"
          stroke="#0a0a0a"
          strokeWidth="8"
        />

        {/* Right diagonal (bottom section) */}
        <line
          x1="180"
          y1="75"
          x2="100"
          y2="175"
          stroke="#0a0a0a"
          strokeWidth="8"
        />
      </svg>
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

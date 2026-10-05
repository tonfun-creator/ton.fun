interface CreatorBadgeProps {
  size?: number;
}

export default function CreatorBadge({ size = 14 }: CreatorBadgeProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: '4px' }}
    >
      <path
        d="M12 2L14.5 4.5L18 4L18.5 7.5L22 9L20 12L22 15L18.5 16.5L18 20L14.5 19.5L12 22L9.5 19.5L6 20L5.5 16.5L2 15L4 12L2 9L5.5 7.5L6 4L9.5 4.5L12 2Z"
        fill="#4ade80"
      />
      <path
        d="M10 12L11.5 13.5L14.5 10.5"
        stroke="#0a0a0a"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

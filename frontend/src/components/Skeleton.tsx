interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  count?: number;
}

export default function Skeleton({ width = '100%', height = '20px', borderRadius = '8px', count = 1 }: SkeletonProps) {
  return (
    <>
      <style>{`
        @keyframes skeletonShimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .skeleton-box {
          background: linear-gradient(90deg, #1a1a1a 25%, #2a2a2a 50%, #1a1a1a 75%);
          background-size: 200% 100%;
          animation: skeletonShimmer 1.5s infinite;
        }
      `}</style>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton-box" style={{ width, height, borderRadius, marginBottom: '8px' }} />
      ))}
    </>
  );
}

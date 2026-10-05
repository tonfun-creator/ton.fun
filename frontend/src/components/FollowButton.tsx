import { useFollow } from '../hooks/useFollow';

interface FollowButtonProps {
  username: string;
}

export default function FollowButton({ username }: FollowButtonProps) {
  const { toggle, isFollowing } = useFollow();
  const following = isFollowing(username);

  return (
    <button
      onClick={() => toggle(username)}
      style={{
        background: following ? 'transparent' : '#0a0a0a',
        color: following ? '#0a0a0a' : '#90EE90',
        border: '2px solid #0a0a0a',
        padding: '4px 12px',
        borderRadius: '999px',
        fontSize: '12px',
        fontWeight: 700,
        cursor: 'pointer',
      }}
    >
      {following ? 'Following' : 'Follow'}
    </button>
  );
}

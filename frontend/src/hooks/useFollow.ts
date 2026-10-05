import { useState, useEffect } from 'react';

export function useFollow() {
  const [following, setFollowing] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('tonfun_following');
    if (stored) {
      try { setFollowing(JSON.parse(stored)); } catch {}
    }
  }, []);

  const toggle = (username: string) => {
    setFollowing(prev => {
      const next = prev.includes(username)
        ? prev.filter(u => u !== username)
        : [...prev, username];
      localStorage.setItem('tonfun_following', JSON.stringify(next));
      return next;
    });
  };

  const isFollowing = (username: string) => following.includes(username);

  return { following, toggle, isFollowing };
}

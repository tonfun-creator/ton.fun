import { useState, useEffect } from 'react';

export interface Comment {
  id: string;
  user: string;
  avatar: string;
  text: string;
  timestamp: number;
  isVerified?: boolean;
}

export function useComments(tokenAddress: string) {
  const [comments, setComments] = useState<Comment[]>([]);
  const storageKey = `comments_${tokenAddress}`;

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try { setComments(JSON.parse(stored)); } catch {}
    } else {
      const demo: Comment[] = [
        { id: '1', user: 'CryptoKing', avatar: '👑', text: 'This token is going to the moon! 🚀', timestamp: Date.now() - 3600000, isVerified: true },
        { id: '2', user: 'DegenTrader', avatar: '🎰', text: 'Just aped in with 5 TON 🔥', timestamp: Date.now() - 1800000 },
        { id: '3', user: 'WhaleAlert', avatar: '🐋', text: 'Huge buy incoming, watch out', timestamp: Date.now() - 900000 },
      ];
      setComments(demo);
    }
  }, [storageKey]);

  const addComment = (user: string, avatar: string, text: string) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      user,
      avatar,
      text,
      timestamp: Date.now(),
    };
    const updated = [newComment, ...comments];
    setComments(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };

  return { comments, addComment };
}

import { useState, useEffect } from 'react';

export interface TelegramUser {
  id: number;
  username: string;
  firstName: string;
  lastName?: string;
  photoUrl?: string;
  isPremium?: boolean;
}

export function useTelegramUser() {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [isLinked, setIsLinked] = useState(false);

  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg?.initDataUnsafe?.user) {
      const u = tg.initDataUnsafe.user;
      setUser({
        id: u.id,
        username: u.username || `user${u.id}`,
        firstName: u.first_name || 'User',
        lastName: u.last_name,
        photoUrl: u.photo_url,
        isPremium: u.is_premium,
      });
      setIsLinked(true);
      localStorage.setItem('tonfun_tg_user', JSON.stringify(u));
    } else {
      // Fallback to localStorage (for browser testing)
      const stored = localStorage.getItem('tonfun_tg_user');
      if (stored) {
        try {
          const u = JSON.parse(stored);
          setUser({
            id: u.id,
            username: u.username || `user${u.id}`,
            firstName: u.first_name || 'User',
            lastName: u.last_name,
            photoUrl: u.photo_url,
            isPremium: u.is_premium,
          });
          setIsLinked(true);
        } catch {}
      }
    }
  }, []);

  return { user, isLinked };
}

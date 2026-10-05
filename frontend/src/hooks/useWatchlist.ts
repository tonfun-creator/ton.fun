import { useState, useEffect } from 'react';

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('tonfun_watchlist');
    if (stored) {
      try { setWatchlist(JSON.parse(stored)); } catch {}
    }
  }, []);

  const toggle = (address: string) => {
    setWatchlist(prev => {
      const next = prev.includes(address)
        ? prev.filter(a => a !== address)
        : [...prev, address];
      localStorage.setItem('tonfun_watchlist', JSON.stringify(next));
      return next;
    });
  };

  const isWatched = (address: string) => watchlist.includes(address);

  return { watchlist, toggle, isWatched };
}

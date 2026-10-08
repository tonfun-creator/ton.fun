import { useState, useEffect } from 'react';

export interface Referral {
  userId: number;
  username: string;
  joinedAt: number;
  hasCreatedToken: boolean;
  pointsEarned: number;
}

const STORAGE_KEY = 'tonfun_referrals';

export function useReferral() {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [referralCode, setReferralCode] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const { code, refs } = JSON.parse(stored);
        setReferralCode(code);
        setReferrals(refs);
      } catch {}
    } else {
      const code = Math.random().toString(36).substring(2, 8).toUpperCase();
      setReferralCode(code);
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ code, refs: [] }));
    }
  }, []);

  const getReferralLink = () => {
    return `https://t.me/tonfun_officialBot/tonfun?startapp=ref_${referralCode}`;
  };

  const addReferral = (userId: number, username: string) => {
    if (referrals.find(r => r.userId === userId)) return;
    const newRef: Referral = {
      userId,
      username,
      joinedAt: Date.now(),
      hasCreatedToken: false,
      pointsEarned: 0,
    };
    const updated = [...referrals, newRef];
    setReferrals(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ code: referralCode, refs: updated }));
  };

  const markTokenCreated = (userId: number) => {
    const updated = referrals.map(r =>
      r.userId === userId
        ? { ...r, hasCreatedToken: true, pointsEarned: r.pointsEarned + 5000 }
        : r
    );
    setReferrals(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ code: referralCode, refs: updated }));
  };

  const totalReferrals = referrals.length;
  const totalPointsFromReferrals = referrals.reduce((s, r) => s + r.pointsEarned, 0);
  const completedReferrals = referrals.filter(r => r.hasCreatedToken).length;

  return {
    referrals,
    referralCode,
    getReferralLink,
    addReferral,
    markTokenCreated,
    totalReferrals,
    totalPointsFromReferrals,
    completedReferrals,
  };
}

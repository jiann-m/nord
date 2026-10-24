import { useEffect, useState } from 'react';
import { useProfile } from '@/context/profile';
import { useWorkouts } from '@/context/workouts';
import type { Friend } from '@/data/friends';
import { formatDistance } from '@/services/format';
import { buildRanking, getFriends, myDistanceKm, type Period } from '../api';

// VIEW-MODEL: loads friends, keeps the period and works out my rank and the gap.
export function useLeaderboardViewModel() {
  const { workouts } = useWorkouts();
  const { profile } = useProfile();
  const [friends, setFriends] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [period, setPeriod] = useState<Period>('week');

  async function load() {
    setLoading(true);
    setError('');
    try {
      setFriends(await getFriends());
    } catch {
      setError('Could not load your friends. Check your connection.');
    } finally {
      setLoading(false);
    }
  }

  // Load once, when the screen opens
  useEffect(() => {
    load();
  }, []);

  const rows = buildRanking(friends, myDistanceKm(workouts, period), period);
  const myIndex = rows.findIndex((row) => row.isMe);
  const me = rows[myIndex];
  const ahead = rows[myIndex - 1];

  const rankText = `#${me.rank} of ${rows.length}`;
  const gapText = ahead
    ? `${formatDistance(ahead.distanceKm - me.distanceKm, profile.units)} behind ${ahead.name}`
    : 'You are in first place. Keep it up!';

  return {
    loading, error, retry: load, period, setPeriod, rows, rankText, gapText,
    hasFriends: friends.length > 0, units: profile.units,
  };
}
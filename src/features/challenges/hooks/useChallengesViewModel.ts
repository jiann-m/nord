import { useEffect, useState } from 'react';
import type { Challenge } from '@/data/challenges';
import { getChallenges, toggleJoined } from '../api';

export type Filter = 'all' | 'joined' | 'open';

// VIEW-MODEL: loads the challenges, keeps the filter and joins / leaves.
export function useChallengesViewModel() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<Filter>('all');

  async function load() {
    setLoading(true);
    setError('');
    try {
      setChallenges(await getChallenges());
    } catch {
      setError('Could not load the challenges. Check your connection.');
    } finally {
      setLoading(false);
    }
  }

  // Load once, when the screen opens (Lab 02: useEffect with [])
  useEffect(() => {
    load();
  }, []);

  function toggleJoin(id: string) {
    setChallenges((current) => current.map((c) => (c.id === id ? toggleJoined(c) : c)));
  }

  const visible = challenges.filter((c) => (filter === 'all' ? true : filter === 'joined' ? c.joined : !c.joined));
  const joinedCount = challenges.filter((c) => c.joined).length;
  const joinedText = `You are in ${joinedCount} ${joinedCount === 1 ? 'challenge' : 'challenges'}`;
  const emptyTitle = filter === 'joined' ? 'You have not joined any challenge' : 'No open challenges';

  return { loading, error, filter, setFilter, visible, joinedText, emptyTitle, retry: load, toggleJoin };
}
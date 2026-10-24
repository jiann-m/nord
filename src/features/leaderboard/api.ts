// MODEL for the Leaderboard: loads friends and builds the ranking.
// Phase 1 uses mock friends after a short delay; Phase 2 reads Firestore here.
import { FRIENDS, type Friend } from '@/data/friends';
import type { Workout } from '@/data/workouts';

export type Period = 'week' | 'month';

export type Row = { id: string; name: string; distanceKm: number; isMe: boolean; rank: number };

const DAY_MS = 24 * 60 * 60 * 1000;
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// How many whole days ago a workout started (0 = today)
function daysAgo(iso: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const day = new Date(iso);
  day.setHours(0, 0, 0, 0);
  return Math.round((today.getTime() - day.getTime()) / DAY_MS);
}

export async function getFriends(): Promise<Friend[]> {
  await wait(600);
  return FRIENDS;
}

// My distance comes from my own workouts
export function myDistanceKm(workouts: Workout[], period: Period) {
  const days = period === 'week' ? 7 : 28;
  return workouts.filter((w) => daysAgo(w.startedAt) < days).reduce((sum, w) => sum + w.distanceKm, 0);
}

// Me + friends, longest distance first, with a rank number
export function buildRanking(friends: Friend[], myKm: number, period: Period): Row[] {
  const rows = [
    { id: 'me', name: 'You', distanceKm: myKm, isMe: true },
    ...friends.map((f) => ({ id: f.id, name: f.name, distanceKm: period === 'week' ? f.weekKm : f.monthKm, isMe: false })),
  ];
  return rows.sort((a, b) => b.distanceKm - a.distanceKm).map((row, index) => ({ ...row, rank: index + 1 }));
}
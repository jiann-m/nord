// MODEL for Stats: turns the list of workouts into totals, bars and shares.
// Phase 2 reads the workouts from storage; these calculations stay the same.
import type { Workout, WorkoutType } from '@/data/workouts';

export type Period = 'week' | 'month';

const DAY_MS = 24 * 60 * 60 * 1000;
const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const WEEK_LABELS = ['3 wk ago', '2 wk ago', 'Last wk', 'This wk'];
export const WORKOUT_TYPES: WorkoutType[] = ['running', 'walking', 'cycling'];

// How many whole days ago a workout started (0 = today, 1 = yesterday)
function daysAgo(iso: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const day = new Date(iso);
  day.setHours(0, 0, 0, 0);
  return Math.round((today.getTime() - day.getTime()) / DAY_MS);
}

// Adds up a list of workouts
function totals(list: Workout[]) {
  return {
    count: list.length,
    distanceKm: list.reduce((sum, w) => sum + w.distanceKm, 0),
    durationSec: list.reduce((sum, w) => sum + w.durationSec, 0),
    calories: list.reduce((sum, w) => sum + w.calories, 0),
  };
}

export function getStats(workouts: Workout[], period: Period) {
  const days = period === 'week' ? 7 : 28;

  // This period and the one before it (to compare)
  const current = workouts.filter((w) => daysAgo(w.startedAt) < days);
  const previous = workouts.filter((w) => daysAgo(w.startedAt) >= days && daysAgo(w.startedAt) < days * 2);
  const now = totals(current);
  const before = totals(previous);

  // % change in distance; null when there is nothing to compare with
  const change = before.distanceKm > 0 ? Math.round(((now.distanceKm - before.distanceKm) / before.distanceKm) * 100) : null;

  // Bars: 7 days for a week, 4 weeks for a month (oldest on the left)
  const daysPerBar = period === 'week' ? 1 : 7;
  const barCount = days / daysPerBar;
  const bars = [];
  for (let i = barCount - 1; i >= 0; i--) {
    const inBar = current.filter((w) => Math.floor(daysAgo(w.startedAt) / daysPerBar) === i);
    const label = period === 'week' ? DAY_NAMES[new Date(Date.now() - i * DAY_MS).getDay()] : WEEK_LABELS[3 - i];
    bars.push({ label, distanceKm: totals(inBar).distanceKm });
  }

  // Share of the distance for each workout type
  const byType = WORKOUT_TYPES.map((type) => {
    const ofType = totals(current.filter((w) => w.type === type));
    return { type, distanceKm: ofType.distanceKm, count: ofType.count, share: now.distanceKm > 0 ? ofType.distanceKm / now.distanceKm : 0 };
  });

  return { now, change, bars, byType };
}
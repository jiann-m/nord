// Shared calculations on the list of workouts (used by Home and Achievements).
import type { Workout } from '@/data/workouts';

const DAY_MS = 24 * 60 * 60 * 1000;

// How many whole days ago a workout started (0 = today, 1 = yesterday)
export function daysAgo(iso: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const day = new Date(iso);
  day.setHours(0, 0, 0, 0);
  return Math.round((today.getTime() - day.getTime()) / DAY_MS);
}

// The days (0 = today) that have at least one workout
function activeDays(workouts: Workout[]) {
  return new Set(workouts.map((w) => daysAgo(w.startedAt)));
}

// Days in a row with a workout, counting back from today (or yesterday if today is still empty)
export function currentStreak(workouts: Workout[]) {
  const days = activeDays(workouts);
  const start = days.has(0) ? 0 : 1;
  let streak = 0;
  while (days.has(start + streak)) {
    streak = streak + 1;
  }
  return streak;
}

// The longest run of days in a row, ever
export function bestStreak(workouts: Workout[]) {
  const days = [...activeDays(workouts)].sort((a, b) => a - b);
  let best = 0;
  let run = 0;
  let previous = -2;
  for (const day of days) {
    run = day === previous + 1 ? run + 1 : 1;
    best = Math.max(best, run);
    previous = day;
  }
  return best;
}

export function todaySteps(workouts: Workout[]) {
  return workouts.filter((w) => daysAgo(w.startedAt) === 0).reduce((sum, w) => sum + w.steps, 0);
}

export function weekDistanceKm(workouts: Workout[]) {
  return workouts.filter((w) => daysAgo(w.startedAt) < 7).reduce((sum, w) => sum + w.distanceKm, 0);
}
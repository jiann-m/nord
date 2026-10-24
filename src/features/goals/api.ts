// MODEL for Goals: the allowed ranges and the progress calculations.
// Phase 2 saves the goals to AsyncStorage / Firestore from here.
import type { Workout } from '@/data/workouts';

export const STEPS_LIMITS = { min: 2000, max: 30000, step: 500 };
export const DISTANCE_LIMITS = { min: 5, max: 200, step: 5 };

const DAY_MS = 24 * 60 * 60 * 1000;

// How many whole days ago a workout started (0 = today)
function daysAgo(iso: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const day = new Date(iso);
  day.setHours(0, 0, 0, 0);
  return Math.round((today.getTime() - day.getTime()) / DAY_MS);
}

// Keeps a value inside its range, e.g. clamp(31000, 2000, 30000) -> 30000
export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function todaySteps(workouts: Workout[]) {
  return workouts.filter((w) => daysAgo(w.startedAt) === 0).reduce((sum, w) => sum + w.steps, 0);
}

export function weekDistanceKm(workouts: Workout[]) {
  return workouts.filter((w) => daysAgo(w.startedAt) < 7).reduce((sum, w) => sum + w.distanceKm, 0);
}
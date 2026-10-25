// MODEL for History: filtering, sorting and totals for the list of workouts.
// Phase 2 reads the workouts from storage; these functions stay the same.
import type { Workout, WorkoutType } from '@/data/workouts';

export type Filter = 'all' | WorkoutType;

// Newest first, only the chosen type
export function filterWorkouts(workouts: Workout[], filter: Filter) {
  const chosen = filter === 'all' ? workouts : workouts.filter((w) => w.type === filter);
  return [...chosen].sort((a, b) => b.startedAt.localeCompare(a.startedAt));
}

export function totalDistanceKm(workouts: Workout[]) {
  return workouts.reduce((sum, w) => sum + w.distanceKm, 0);
}
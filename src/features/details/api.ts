// MODEL for Workout Details: splits and the share recap for one saved workout.
// Phase 2 builds the splits from the real GPS times; Phase 1 spreads the time evenly.
import type { Workout } from '@/data/workouts';

export type Split = { index: number; km: number; seconds: number };

// One split per whole km, plus the last part (for example 0.6 km)
export function getSplits(workout: Workout): Split[] {
  if (workout.distanceKm <= 0) return [];
  const secPerKm = workout.durationSec / workout.distanceKm;
  const splits: Split[] = [];
  let left = workout.distanceKm;
  let index = 1;
  while (left > 0.01) {
    const km = Math.min(1, left);
    splits.push({ index, km, seconds: km * secPerKm });
    left = left - km;
    index = index + 1;
  }
  return splits;
}

// Average speed in km/h
export function averageSpeed(distanceKm: number, durationSec: number) {
  return durationSec > 0 ? distanceKm / (durationSec / 3600) : 0;
}

// The text that is shared (FR8)
export function buildRecap(title: string, date: string, numbers: string, note?: string) {
  const lines = [`My ${title.toLowerCase()} on Nord · ${date}`, numbers];
  if (note) lines.push(`"${note}"`);
  return lines.join('\n');
}
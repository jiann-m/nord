// MODEL for Workout Summary: today's weather and the personal-record check.
// Phase 1 uses mock weather after a short delay; Phase 2 calls a weather API here.
import type { Weather, Workout } from '@/data/workouts';

export const NOTE_LIMIT = 140;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getTodayWeather(): Promise<Weather> {
  await wait(600);
  return { tempC: 24, condition: 'sunny' };
}

// A new record = longer than every saved workout of the same type
export function isLongestOfType(draft: Workout, saved: Workout[]) {
  const sameType = saved.filter((w) => w.type === draft.type);
  return sameType.every((w) => draft.distanceKm > w.distanceKm);
}

// Average speed in km/h
export function averageSpeed(distanceKm: number, durationSec: number) {
  return durationSec > 0 ? distanceKm / (durationSec / 3600) : 0;
}
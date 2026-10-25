// MODEL for Workout Setup: the hourly forecast and the suggested routes.
// Phase 1 uses mock data after a short delay; Phase 2 calls a weather API and the Maps API here.
import type { Weather, WorkoutType } from '@/data/workouts';

export type HourForecast = Weather & { hour: string };

export type SuggestedRoute = { id: string; name: string; distanceKm: number; types: WorkoutType[] };

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getHourlyForecast(): Promise<HourForecast[]> {
  await wait(700);
  return [
    { hour: 'Now', tempC: 24, condition: 'sunny' },
    { hour: '+1h', tempC: 25, condition: 'sunny' },
    { hour: '+2h', tempC: 26, condition: 'cloudy' },
    { hour: '+3h', tempC: 25, condition: 'windy' },
    { hour: '+4h', tempC: 23, condition: 'cloudy' },
  ];
}

// The id is the id of a past workout that used this route (Live Tracking looks the route up by id)
export const SUGGESTED_ROUTES: SuggestedRoute[] = [
  { id: 'w10', name: 'BUE campus loop', distanceKm: 3.6, types: ['running', 'walking'] },
  { id: 'w9', name: 'Shorouk park loop', distanceKm: 4.2, types: ['running', 'walking'] },
  { id: 'w8', name: 'Ring road', distanceKm: 18.5, types: ['cycling'] },
];

export function routesFor(type: WorkoutType) {
  return SUGGESTED_ROUTES.filter((route) => route.types.includes(type));
}
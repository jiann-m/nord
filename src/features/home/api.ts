// MODEL for Home: today's weather and the small texts that depend on it.
// Phase 1 returns mock weather after a short delay; Phase 2 calls a weather API here.
import type { Weather } from '@/data/workouts';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getWeather(): Promise<Weather> {
  await wait(800);
  return { tempC: 24, condition: 'sunny' };
}

// Icon for each weather condition (Ionicons names)
export const WEATHER_ICONS = { sunny: 'sunny', cloudy: 'cloudy', windy: 'flag', rainy: 'rainy' } as const;

export function weatherAdvice(weather: Weather) {
  if (weather.condition === 'rainy') return 'Rain expected. Bring a jacket or try a shorter route.';
  if (weather.tempC >= 32) return 'It is hot. Go early or late and drink water.';
  if (weather.condition === 'windy') return 'Windy today. Cycling will feel harder.';
  return 'Good conditions for a workout.';
}

export function greeting(hour: number) {
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}
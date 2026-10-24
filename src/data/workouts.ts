export type WorkoutType = 'running' | 'walking' | 'cycling';

export type RoutePoint = { latitude: number; longitude: number };

export type Weather = { tempC: number; condition: 'sunny' | 'cloudy' | 'windy' | 'rainy' };

export type Workout = {
  id: string;
  type: WorkoutType;
  startedAt: string;
  durationSec: number;
  distanceKm: number;
  steps: number;
  calories: number;
  route: RoutePoint[];
  weather?: Weather;
  note?: string;
};

// Loops around the BUE campus, El Shorouk
const CAMPUS_LOOP: RoutePoint[] = [
  { latitude: 30.1185, longitude: 31.605 },
  { latitude: 30.1205, longitude: 31.6062 },
  { latitude: 30.1222, longitude: 31.6085 },
  { latitude: 30.1218, longitude: 31.6112 },
  { latitude: 30.1198, longitude: 31.6128 },
  { latitude: 30.1176, longitude: 31.612 },
  { latitude: 30.1162, longitude: 31.6098 },
  { latitude: 30.1166, longitude: 31.6072 },
  { latitude: 30.1185, longitude: 31.605 },
];

const PARK_LOOP: RoutePoint[] = [
  { latitude: 30.1302, longitude: 31.5951 },
  { latitude: 30.1318, longitude: 31.5968 },
  { latitude: 30.1315, longitude: 31.5994 },
  { latitude: 30.1296, longitude: 31.6006 },
  { latitude: 30.128, longitude: 31.5988 },
  { latitude: 30.1284, longitude: 31.5962 },
  { latitude: 30.1302, longitude: 31.5951 },
];

const RING_ROAD: RoutePoint[] = [
  { latitude: 30.1085, longitude: 31.625 },
  { latitude: 30.1165, longitude: 31.632 },
  { latitude: 30.1262, longitude: 31.6355 },
  { latitude: 30.1318, longitude: 31.6268 },
  { latitude: 30.1276, longitude: 31.6175 },
  { latitude: 30.1168, longitude: 31.6152 },
  { latitude: 30.1085, longitude: 31.625 },
];

// An ISO date a number of days before today, at a given hour
function daysAgo(days: number, hour: number) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  date.setHours(hour, 0, 0, 0);
  return date.toISOString();
}

export const WORKOUTS: Workout[] = [
  { id: 'w10', type: 'running', startedAt: daysAgo(0, 7), durationSec: 1260, distanceKm: 3.6, steps: 4300, calories: 290, route: CAMPUS_LOOP, weather: { tempC: 24, condition: 'sunny' }, note: 'Felt strong on the last lap.' },
  { id: 'w9', type: 'walking', startedAt: daysAgo(1, 18), durationSec: 2820, distanceKm: 4.2, steps: 5600, calories: 190, route: PARK_LOOP, weather: { tempC: 27, condition: 'cloudy' } },
  { id: 'w8', type: 'cycling', startedAt: daysAgo(2, 7), durationSec: 3600, distanceKm: 18.5, steps: 0, calories: 540, route: RING_ROAD, weather: { tempC: 22, condition: 'windy' } },
  { id: 'w7', type: 'running', startedAt: daysAgo(3, 18), durationSec: 1920, distanceKm: 5.1, steps: 6200, calories: 410, route: CAMPUS_LOOP },
  { id: 'w6', type: 'walking', startedAt: daysAgo(5, 7), durationSec: 2400, distanceKm: 3.4, steps: 4700, calories: 150, route: PARK_LOOP },
  { id: 'w5', type: 'running', startedAt: daysAgo(8, 7), durationSec: 2700, distanceKm: 7.2, steps: 8800, calories: 580, route: CAMPUS_LOOP },
  { id: 'w4', type: 'cycling', startedAt: daysAgo(12, 18), durationSec: 4500, distanceKm: 24.8, steps: 0, calories: 700, route: RING_ROAD },
  { id: 'w3', type: 'running', startedAt: daysAgo(20, 7), durationSec: 3300, distanceKm: 10.1, steps: 12300, calories: 820, route: CAMPUS_LOOP },
  { id: 'w2', type: 'walking', startedAt: daysAgo(34, 18), durationSec: 3000, distanceKm: 4.8, steps: 6400, calories: 210, route: PARK_LOOP },
  { id: 'w1', type: 'running', startedAt: daysAgo(55, 7), durationSec: 1500, distanceKm: 4.0, steps: 4900, calories: 320, route: CAMPUS_LOOP },
];
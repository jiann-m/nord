// MODEL for Live Tracking. Phase 1 SIMULATES the GPS: a point moves along a real route
// at a steady speed, 6x faster than real time so it can be shown in a demo.
// Phase 2 replaces pathAfter and liveStats with expo-location (real GPS) and the step sensor.
import { WORKOUTS, type RoutePoint, type WorkoutType } from '@/data/workouts';

export const SPEED_UP = 6; // 1 real second = 6 workout seconds

// Average speed (km/h), MET value and steps per km for each workout type
const SPEED_KMH = { running: 10, walking: 5, cycling: 20 };
const MET = { running: 9.8, walking: 3.5, cycling: 7.5 };
const STEPS_PER_KM = { running: 1200, walking: 1330, cycling: 0 };

// A route to follow: the chosen one, or the usual route for this type
export function routeFor(type: WorkoutType, routeId?: string): RoutePoint[] {
  const chosen = WORKOUTS.find((w) => w.id === routeId);
  const usual = WORKOUTS.find((w) => w.type === type);
  return chosen ? chosen.route : usual ? usual.route : [];
}

// Distance between two points in km (haversine formula)
function kmBetween(a: RoutePoint, b: RoutePoint) {
  const rad = Math.PI / 180;
  const dLat = (b.latitude - a.latitude) * rad;
  const dLng = (b.longitude - a.longitude) * rad;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.latitude * rad) * Math.cos(b.latitude * rad) * Math.sin(dLng / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(h));
}

// The part of the route covered after `km` (loops back to the start after each lap)
export function pathAfter(route: RoutePoint[], km: number): RoutePoint[] {
  if (route.length < 2) return route;
  let lapKm = 0;
  for (let i = 1; i < route.length; i++) lapKm += kmBetween(route[i - 1], route[i]);
  let left = km % lapKm;

  const path = [route[0]];
  for (let i = 1; i < route.length; i++) {
    const piece = kmBetween(route[i - 1], route[i]);
    if (left >= piece) {
      path.push(route[i]);
      left = left - piece;
    } else {
      const t = left / piece; // how far along this piece
      path.push({
        latitude: route[i - 1].latitude + (route[i].latitude - route[i - 1].latitude) * t,
        longitude: route[i - 1].longitude + (route[i].longitude - route[i - 1].longitude) * t,
      });
      break;
    }
  }
  return path;
}

// Live numbers for a workout of this type and length
export function liveStats(type: WorkoutType, elapsedSec: number, weightKg: number) {
  const hours = elapsedSec / 3600;
  const distanceKm = SPEED_KMH[type] * hours;
  return {
    distanceKm,
    speedKmh: elapsedSec > 0 ? SPEED_KMH[type] : 0,
    steps: Math.round(distanceKm * STEPS_PER_KM[type]),
    // Calories = MET x body weight (kg) x hours
    calories: Math.round(MET[type] * weightKg * hours),
  };
}
import type { RoutePoint } from '@/data/workouts';

// The BUE campus, El Shorouk: used when there are no points yet
const CAMPUS = { latitude: 30.1185, longitude: 31.605 };

// The map area that fits every point, with a little space around it
export function regionFor(points: RoutePoint[]) {
  if (points.length === 0) {
    return { ...CAMPUS, latitudeDelta: 0.02, longitudeDelta: 0.02 };
  }
  const lats = points.map((p) => p.latitude);
  const lngs = points.map((p) => p.longitude);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);
  return {
    latitude: (minLat + maxLat) / 2,
    longitude: (minLng + maxLng) / 2,
    latitudeDelta: Math.max(0.006, (maxLat - minLat) * 1.5),
    longitudeDelta: Math.max(0.006, (maxLng - minLng) * 1.5),
  };
}
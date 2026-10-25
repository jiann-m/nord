import { useEffect, useState } from 'react';
import type { WorkoutType } from '@/data/workouts';
import { getHourlyForecast, routesFor, type HourForecast } from '../api';

// VIEW-MODEL: the chosen type and route, and the forecast (with loading / error).
export function useWorkoutSetupViewModel(onStart: (type: WorkoutType, routeId?: string) => void) {
  const [type, setType] = useState<WorkoutType>('running');
  const [routeId, setRouteId] = useState<string | undefined>(undefined);
  const [forecast, setForecast] = useState<HourForecast[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadForecast() {
    setLoading(true);
    setError('');
    try {
      setForecast(await getHourlyForecast());
    } catch {
      setError('Could not load the forecast.');
    } finally {
      setLoading(false);
    }
  }

  // Load the forecast once, when the screen opens
  useEffect(() => {
    loadForecast();
  }, []);

  // A new type has different routes, so the chosen route is cleared
  function chooseType(next: WorkoutType) {
    setType(next);
    setRouteId(undefined);
  }

  // Tapping the chosen route again un-chooses it
  function chooseRoute(id: string) {
    setRouteId((current) => (current === id ? undefined : id));
  }

  return {
    type, routeId, routes: routesFor(type), forecast, loading, error,
    retry: loadForecast, chooseType, chooseRoute,
    start: () => onStart(type, routeId),
  };
}
import { useEffect, useState } from 'react';
import { useProfile } from '@/context/profile';
import { useWorkouts } from '@/context/workouts';
import type { WorkoutType } from '@/data/workouts';
import { formatDistance, formatDuration, formatPace } from '@/services/format';
import { SPEED_UP, liveStats, pathAfter, routeFor } from '../api';

// VIEW-MODEL: the clock, pause / resume / stop, and the live numbers.
export function useLiveTrackingViewModel(type: WorkoutType, routeId: string | undefined, onFinish: () => void) {
  const { profile } = useProfile();
  const { setDraft } = useWorkouts();
  const [startedAt] = useState(() => new Date().toISOString());
  const [elapsedSec, setElapsedSec] = useState(0);
  const [running, setRunning] = useState(true);
  const [confirmingStop, setConfirmingStop] = useState(false);

  // Every real second, add SPEED_UP workout seconds while running.
  // The cleanup stops the timer when paused or when the screen closes (Lab 02).
  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => setElapsedSec((current) => current + SPEED_UP), 1000);
    return () => clearInterval(timer);
  }, [running]);

  const route = routeFor(type, routeId);
  const stats = liveStats(type, elapsedSec, profile.weightKg);
  const path = pathAfter(route, stats.distanceKm);

  function togglePause() {
    setRunning((current) => !current);
  }

  // Stop asks first; the clock waits while the question is open
  function askStop() {
    setRunning(false);
    setConfirmingStop(true);
  }

  function keepGoing() {
    setConfirmingStop(false);
    setRunning(true);
  }

  // Save what was recorded as a draft; Workout Summary shows it and saves it
  function finish() {
    setDraft({
      id: `w${Date.now()}`,
      type,
      startedAt,
      durationSec: elapsedSec,
      distanceKm: Number(stats.distanceKm.toFixed(2)),
      steps: stats.steps,
      calories: stats.calories,
      route: path,
    });
    onFinish();
  }

  return {
    title: type.charAt(0).toUpperCase() + type.slice(1),
    running, confirmingStop, path,
    time: formatDuration(elapsedSec),
    tiles: [
      { label: 'Distance', value: formatDistance(stats.distanceKm, profile.units) },
      { label: 'Pace', value: formatPace(elapsedSec, stats.distanceKm, profile.units) },
      { label: 'Speed', value: `${stats.speedKmh} km/h` },
      { label: type === 'cycling' ? 'Steps (none on a bike)' : 'Steps', value: stats.steps.toLocaleString() },
      { label: 'Calories', value: `${stats.calories} kcal` },
    ],
    togglePause, askStop, keepGoing, finish,
  };
}
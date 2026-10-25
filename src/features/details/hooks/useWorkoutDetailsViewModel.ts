import { useState } from 'react';
import { Share } from 'react-native';
import { useProfile } from '@/context/profile';
import { useWorkouts } from '@/context/workouts';
import { formatDate, formatDistance, formatDuration, formatPace } from '@/services/format';
import { averageSpeed, buildRecap, getSplits } from '../api';

// VIEW-MODEL: one saved workout, ready to show, and the share action.
export function useWorkoutDetailsViewModel(workoutId: string) {
  const { workouts } = useWorkouts();
  const { profile } = useProfile();
  const [shareMessage, setShareMessage] = useState('');

  const workout = workouts.find((w) => w.id === workoutId);

  if (!workout) {
    return { found: false as const };
  }

  const title = workout.type.charAt(0).toUpperCase() + workout.type.slice(1);
  const date = formatDate(workout.startedAt);
  const time = new Date(workout.startedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const distance = formatDistance(workout.distanceKm, profile.units);
  const duration = formatDuration(workout.durationSec);
  const pace = formatPace(workout.durationSec, workout.distanceKm, profile.units);

  const splits = getSplits(workout).map((split) => ({
    index: split.index,
    label: split.km < 1 ? `Last ${split.km.toFixed(1)} km` : `Km ${split.index}`,
    time: formatDuration(split.seconds),
    share: split.km, // a full km fills the bar, a part fills part of it
  }));

  async function share() {
    setShareMessage('');
    try {
      await Share.share({ message: buildRecap(title, date, `${distance} · ${duration} · ${pace}`, workout?.note) });
    } catch {
      setShareMessage('Sharing is not available on this device.');
    }
  }

  return {
    found: true as const,
    title,
    subtitle: `${date} · ${time}`,
    route: workout.route,
    tiles: [
      { label: 'Distance', value: distance },
      { label: 'Time', value: duration },
      { label: 'Pace', value: pace },
      { label: 'Avg speed', value: `${averageSpeed(workout.distanceKm, workout.durationSec).toFixed(1)} km/h` },
      { label: 'Calories', value: `${workout.calories} kcal` },
      { label: 'Steps', value: workout.steps.toLocaleString() },
    ],
    splits,
    weatherText: workout.weather ? `${workout.weather.tempC}°C · ${workout.weather.condition}` : null,
    note: workout.note ? workout.note : null,
    share,
    shareMessage,
  };
}
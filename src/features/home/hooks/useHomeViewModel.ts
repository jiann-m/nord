import { useEffect, useState } from 'react';
import { useProfile } from '@/context/profile';
import { useWorkouts } from '@/context/workouts';
import type { Weather } from '@/data/workouts';
import { currentStreak, todaySteps, weekDistanceKm } from '@/services/activity';
import { formatDate, formatDistance, formatDuration } from '@/services/format';
import { WEATHER_ICONS, getWeather, greeting, weatherAdvice } from '../api';

// VIEW-MODEL: greeting, streak, goal progress, weather (with its own loading / error) and the last workout.
export function useHomeViewModel() {
  const { profile, goals } = useProfile();
  const { workouts } = useWorkouts();
  const [weather, setWeather] = useState<Weather | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [weatherError, setWeatherError] = useState('');

  async function loadWeather() {
    setWeatherLoading(true);
    setWeatherError('');
    try {
      setWeather(await getWeather());
    } catch {
      setWeatherError('Could not load the weather.');
    } finally {
      setWeatherLoading(false);
    }
  }

  // Load the weather once, when Home opens
  useEffect(() => {
    loadWeather();
  }, []);

  const now = new Date();
  const firstName = profile.name.split(' ')[0];
  const streak = currentStreak(workouts);
  const steps = todaySteps(workouts);
  const km = weekDistanceKm(workouts);

  // Newest workout first (the list is not trusted to be in order)
  const latest = [...workouts].sort((a, b) => b.startedAt.localeCompare(a.startedAt))[0];

  return {
    dateText: now.toDateString(),
    title: `${greeting(now.getHours())}, ${firstName}`,
    streakText: streak > 0 ? `${streak}-day streak` : 'Start a streak today',
    stepsProgress: steps / goals.dailySteps,
    stepsCaption: `${steps.toLocaleString()} of ${goals.dailySteps.toLocaleString()} steps`,
    distanceProgress: km / goals.weeklyDistanceKm,
    distanceCaption: `${formatDistance(km, profile.units)} of ${formatDistance(goals.weeklyDistanceKm, profile.units)}`,
    weatherLoading,
    weatherError,
    retryWeather: loadWeather,
    weatherIcon: weather ? WEATHER_ICONS[weather.condition] : null,
    weatherText: weather ? `${weather.tempC}°C · ${weather.condition}` : '',
    weatherAdvice: weather ? weatherAdvice(weather) : '',
    lastWorkout: latest
      ? {
          id: latest.id,
          title: latest.type.charAt(0).toUpperCase() + latest.type.slice(1),
          date: formatDate(latest.startedAt),
          numbers: `${formatDistance(latest.distanceKm, profile.units)} · ${formatDuration(latest.durationSec)}`,
        }
      : null,
  };
}
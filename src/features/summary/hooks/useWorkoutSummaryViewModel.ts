import { useEffect, useState } from 'react';
import { useProfile } from '@/context/profile';
import { useWorkouts } from '@/context/workouts';
import type { Weather } from '@/data/workouts';
import { formatDistance, formatDuration, formatPace } from '@/services/format';
import { NOTE_LIMIT, averageSpeed, getTodayWeather, isLongestOfType } from '../api';

// VIEW-MODEL: the finished workout (the draft), the weather and note choices, save / discard.
export function useWorkoutSummaryViewModel(onSaved: () => void, onDiscarded: () => void) {
  const { draft, setDraft, saveDraft, discardDraft, workouts } = useWorkouts();
  const { profile } = useProfile();
  const [note, setNote] = useState('');
  const [attachWeather, setAttachWeather] = useState(true);
  const [weather, setWeather] = useState<Weather | null>(null);
  const [weatherError, setWeatherError] = useState('');
  const [confirmingDiscard, setConfirmingDiscard] = useState(false);

  async function loadWeather() {
    setWeatherError('');
    try {
      const today = await getTodayWeather();
      setWeather(today);
      // Keep the weather on the draft, so saveDraft can attach it
      if (draft) setDraft({ ...draft, weather: today });
    } catch {
      setWeatherError('Weather is not available right now.');
    }
  }

  // Load the weather once, when the screen opens
  useEffect(() => {
    loadWeather();
  }, []);

  function save() {
    saveDraft(note.trim(), attachWeather && weather !== null);
    onSaved();
  }

  // Discard asks first (second tap confirms)
  function discard() {
    if (!confirmingDiscard) {
      setConfirmingDiscard(true);
      return;
    }
    discardDraft();
    onDiscarded();
  }

  if (!draft) {
    return { hasDraft: false as const };
  }

  return {
    hasDraft: true as const,
    route: draft.route,
    title: draft.type.charAt(0).toUpperCase() + draft.type.slice(1),
    isRecord: draft.distanceKm > 0 && isLongestOfType(draft, workouts),
    tiles: [
      { label: 'Distance', value: formatDistance(draft.distanceKm, profile.units) },
      { label: 'Time', value: formatDuration(draft.durationSec) },
      { label: 'Pace', value: formatPace(draft.durationSec, draft.distanceKm, profile.units) },
      { label: 'Avg speed', value: `${averageSpeed(draft.distanceKm, draft.durationSec).toFixed(1)} km/h` },
      { label: 'Calories', value: `${draft.calories} kcal` },
      { label: 'Steps', value: draft.steps.toLocaleString() },
    ],
    weatherText: weather ? `${weather.tempC}°C · ${weather.condition}` : weatherError || 'Checking the weather…',
    weatherReady: weather !== null,
    attachWeather, setAttachWeather,
    note, setNote, noteCount: `${note.length} / ${NOTE_LIMIT}`, noteLimit: NOTE_LIMIT,
    confirmingDiscard, save, discard,
  };
}
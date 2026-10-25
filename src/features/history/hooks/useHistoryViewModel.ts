import { useState } from 'react';
import { useProfile } from '@/context/profile';
import { useWorkouts } from '@/context/workouts';
import { formatDate, formatDistance, formatDuration, formatPace } from '@/services/format';
import { filterWorkouts, totalDistanceKm, type Filter } from '../api';

// VIEW-MODEL: the filter and the rows to show, already formatted.
export function useHistoryViewModel() {
  const { workouts } = useWorkouts();
  const { profile } = useProfile();
  const [filter, setFilter] = useState<Filter>('all');

  const shown = filterWorkouts(workouts, filter);

  const rows = shown.map((w) => ({
    id: w.id,
    type: w.type,
    title: w.type.charAt(0).toUpperCase() + w.type.slice(1),
    date: formatDate(w.startedAt),
    distance: formatDistance(w.distanceKm, profile.units),
    details: `${formatDuration(w.durationSec)} · ${formatPace(w.durationSec, w.distanceKm, profile.units)}`,
    note: w.note,
  }));

  const count = shown.length;

  return {
    filter, setFilter, rows,
    totalsText: `${count} ${count === 1 ? 'workout' : 'workouts'} · ${formatDistance(totalDistanceKm(shown), profile.units)}`,
  };
}
import { useState } from 'react';
import { useProfile } from '@/context/profile';
import { useWorkouts } from '@/context/workouts';
import { formatDistance, formatDuration } from '@/services/format';
import { getStats, type Period } from '../api';

// VIEW-MODEL: the chosen period and the numbers the screen shows, already formatted.
export function useStatsViewModel() {
  const { workouts } = useWorkouts();
  const { profile } = useProfile();
  const [period, setPeriod] = useState<Period>('week');

  const stats = getStats(workouts, period);
  // Words that change with the period
  const before = period === 'week' ? 'last week' : 'the 4 weeks before';
  const emptyTitle = period === 'week' ? 'No workouts this week' : 'No workouts in the last 4 weeks';

  const changeText =
    stats.change === null
      ? `No workouts ${before} to compare with`
      : `${stats.change >= 0 ? '▲' : '▼'} ${Math.abs(stats.change)}% distance vs ${before}`;

  const tiles = [
    { label: 'Distance', value: formatDistance(stats.now.distanceKm, profile.units) },
    { label: 'Time', value: formatDuration(stats.now.durationSec) },
    { label: 'Calories', value: `${stats.now.calories} kcal` },
    { label: 'Workouts', value: String(stats.now.count) },
  ];

  const typeRows = stats.byType.map((row) => ({
    type: row.type,
    label: row.type.charAt(0).toUpperCase() + row.type.slice(1),
    share: row.share,
    caption: `${formatDistance(row.distanceKm, profile.units)} · ${row.count} ${row.count === 1 ? 'workout' : 'workouts'}`,
  }));

  return {
    period, setPeriod, emptyTitle, isEmpty: stats.now.count === 0,
    tiles, changeText, bars: stats.bars, typeRows, units: profile.units,
  };
}
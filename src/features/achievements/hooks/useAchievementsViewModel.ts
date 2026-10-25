import { useProfile } from '@/context/profile';
import { useWorkouts } from '@/context/workouts';
import type { Workout } from '@/data/workouts';
import { formatDate, formatDistance, formatDuration, formatPace } from '@/services/format';
import { bestStreak, currentStreak } from '@/services/activity';
import { getBadges, getRecords, lastSevenDays } from '../api';

// VIEW-MODEL: streak, badges (earned or with progress) and personal records, ready to show.
export function useAchievementsViewModel() {
  const { workouts } = useWorkouts();
  const { profile } = useProfile();

  const badges = getBadges(workouts).map((badge) => {
    const earned = badge.current >= badge.target;
    const shown = Math.min(badge.current, badge.target);
    return {
      ...badge,
      earned,
      progress: badge.current / badge.target,
      progressText: earned ? 'Earned' : `${Number.isInteger(shown) ? shown : shown.toFixed(1)} / ${badge.target} ${badge.unit}`,
    };
  });
  const earnedCount = badges.filter((badge) => badge.earned).length;

  const records = getRecords(workouts);
  // One row per record; workoutId lets the row open that workout
  function recordRow(label: string, workout: Workout | null, value: (w: Workout) => string) {
    return {
      label,
      value: workout ? value(workout) : '—',
      date: workout ? formatDate(workout.startedAt) : 'No workout yet',
      workoutId: workout ? workout.id : null,
    };
  }
  const recordRows = [
    recordRow('Longest run', records.longestRun, (w) => formatDistance(w.distanceKm, profile.units)),
    recordRow('Fastest run pace', records.fastestRun, (w) => formatPace(w.durationSec, w.distanceKm, profile.units)),
    recordRow('Longest ride', records.longestRide, (w) => formatDistance(w.distanceKm, profile.units)),
    recordRow('Longest workout', records.longestWorkout, (w) => formatDuration(w.durationSec)),
  ];

  const streak = currentStreak(workouts);

  return {
    streakText: `${streak} ${streak === 1 ? 'day' : 'days'}`,
    bestText: `Best streak: ${bestStreak(workouts)} days`,
    week: lastSevenDays(workouts),
    badges,
    badgesTitle: `Badges · ${earnedCount} of ${badges.length}`,
    recordRows,
  };
}
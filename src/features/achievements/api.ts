// MODEL for Achievements: badges, records and the last 7 days, all worked out from the workouts.
// Phase 2 also stores when each badge was earned (UserBadge in the data model).
import type { Workout } from '@/data/workouts';
import { bestStreak, daysAgo } from '@/services/activity';

export type BadgeIcon = 'footsteps' | 'barbell' | 'ribbon' | 'medal' | 'sunny' | 'flame' | 'earth';

export type Badge = {
  id: string;
  title: string;
  description: string;
  icon: BadgeIcon;
  current: number;
  target: number;
  unit: string;
};

const DAY_MS = 24 * 60 * 60 * 1000;
const DAY_LETTERS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export function getBadges(workouts: Workout[]): Badge[] {
  const runs = workouts.filter((w) => w.type === 'running');
  const longestRun = Math.max(0, ...runs.map((w) => w.distanceKm));
  const totalKm = workouts.reduce((sum, w) => sum + w.distanceKm, 0);
  const earlyCount = workouts.filter((w) => new Date(w.startedAt).getHours() < 8).length;

  return [
    { id: 'first', title: 'First steps', description: 'Finish your first workout', icon: 'footsteps', current: workouts.length, target: 1, unit: 'workout' },
    { id: 'regular', title: 'Regular', description: 'Finish 10 workouts', icon: 'barbell', current: workouts.length, target: 10, unit: 'workouts' },
    { id: '5k', title: '5K runner', description: 'Run 5 km in one go', icon: 'ribbon', current: longestRun, target: 5, unit: 'km' },
    { id: '10k', title: '10K club', description: 'Run 10 km in one go', icon: 'medal', current: longestRun, target: 10, unit: 'km' },
    { id: 'early', title: 'Early bird', description: '5 workouts before 8 am', icon: 'sunny', current: earlyCount, target: 5, unit: 'workouts' },
    { id: 'streak', title: 'Week warrior', description: 'Work out 7 days in a row', icon: 'flame', current: bestStreak(workouts), target: 7, unit: 'days' },
    { id: 'century', title: 'Century', description: 'Cover 100 km in total', icon: 'earth', current: totalKm, target: 100, unit: 'km' },
  ];
}

// The workout that wins, or null when there is none yet
function best(list: Workout[], isBetter: (a: Workout, b: Workout) => boolean) {
  if (list.length === 0) return null;
  return list.reduce((winner, w) => (isBetter(w, winner) ? w : winner));
}

export function getRecords(workouts: Workout[]) {
  const runs = workouts.filter((w) => w.type === 'running');
  const rides = workouts.filter((w) => w.type === 'cycling');
  return {
    longestRun: best(runs, (a, b) => a.distanceKm > b.distanceKm),
    fastestRun: best(runs, (a, b) => a.durationSec / a.distanceKm < b.durationSec / b.distanceKm),
    longestRide: best(rides, (a, b) => a.distanceKm > b.distanceKm),
    longestWorkout: best(workouts, (a, b) => a.durationSec > b.durationSec),
  };
}

// The last 7 days, oldest first, and whether each one had a workout
export function lastSevenDays(workouts: Workout[]) {
  const active = new Set(workouts.map((w) => daysAgo(w.startedAt)));
  return [6, 5, 4, 3, 2, 1, 0].map((day) => ({
    day,
    letter: DAY_LETTERS[new Date(Date.now() - day * DAY_MS).getDay()],
    active: active.has(day),
  }));
}
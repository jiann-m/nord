import { useState } from 'react';
import { useProfile } from '@/context/profile';
import { useWorkouts } from '@/context/workouts';
import { DISTANCE_LIMITS, STEPS_LIMITS, clamp, todaySteps, weekDistanceKm } from '../api';

// VIEW-MODEL: the two goals being edited, the progress against them and the save action.
export function useGoalsViewModel() {
  const { goals, updateGoals } = useProfile();
  const { workouts } = useWorkouts();
  const [dailySteps, setDailySteps] = useState(goals.dailySteps);
  const [weeklyKm, setWeeklyKm] = useState(goals.weeklyDistanceKm);
  const [saved, setSaved] = useState(false);

  // direction is 1 for + and -1 for -
  function changeSteps(direction: number) {
    setDailySteps((current) => clamp(current + direction * STEPS_LIMITS.step, STEPS_LIMITS.min, STEPS_LIMITS.max));
    setSaved(false);
  }

  function changeKm(direction: number) {
    setWeeklyKm((current) => clamp(current + direction * DISTANCE_LIMITS.step, DISTANCE_LIMITS.min, DISTANCE_LIMITS.max));
    setSaved(false);
  }

  function save() {
    updateGoals({ dailySteps, weeklyDistanceKm: weeklyKm });
    setSaved(true);
  }

  // Progress uses the values on screen, so the bars move while you edit
  const steps = todaySteps(workouts);
  const km = weekDistanceKm(workouts);
  const changed = dailySteps !== goals.dailySteps || weeklyKm !== goals.weeklyDistanceKm;

  return {
    dailySteps, weeklyKm, saved, canSave: changed,
    stepsAtMin: dailySteps === STEPS_LIMITS.min,
    stepsAtMax: dailySteps === STEPS_LIMITS.max,
    kmAtMin: weeklyKm === DISTANCE_LIMITS.min,
    kmAtMax: weeklyKm === DISTANCE_LIMITS.max,
    stepsProgress: steps / dailySteps,
    stepsCaption: `${steps.toLocaleString()} of ${dailySteps.toLocaleString()} steps today`,
    distanceProgress: km / weeklyKm,
    distanceCaption: `${km.toFixed(1)} of ${weeklyKm} km this week`,
    changeSteps, changeKm, save,
  };
}
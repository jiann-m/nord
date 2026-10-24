export type Units = 'metric' | 'imperial';

export type Profile = {
  name: string;
  email: string;
  ageYears: number;
  weightKg: number;
  heightCm: number;
  units: Units;
};

export type Goals = {
  dailySteps: number;
  weeklyDistanceKm: number;
};

export const START_PROFILE: Profile = {
  name: 'Nour Hassan',
  email: 'nour@example.com',
  ageYears: 21,
  weightKg: 64,
  heightCm: 170,
  units: 'metric',
};

export const START_GOALS: Goals = { dailySteps: 10000, weeklyDistanceKm: 40 };
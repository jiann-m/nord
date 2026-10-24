import { createContext, useContext, useState, type PropsWithChildren } from 'react';
import { START_GOALS, START_PROFILE, type Goals, type Profile } from '@/data/profile';

type ProfileValue = {
  profile: Profile;
  goals: Goals;
  updateProfile: (changes: Partial<Profile>) => void;
  updateGoals: (goals: Goals) => void;
};

const ProfileContext = createContext<ProfileValue | null>(null);

export function ProfileProvider({ children }: PropsWithChildren) {
  const [profile, setProfile] = useState<Profile>(START_PROFILE);
  const [goals, setGoals] = useState<Goals>(START_GOALS);

  const updateProfile = (changes: Partial<Profile>) => setProfile((current) => ({ ...current, ...changes }));
  const updateGoals = (next: Goals) => setGoals(next);

  return (
    <ProfileContext.Provider value={{ profile, goals, updateProfile, updateGoals }}>{children}</ProfileContext.Provider>
  );
}

export function useProfile() {
  const value = useContext(ProfileContext);
  if (!value) throw new Error('useProfile must be inside ProfileProvider');
  return value;
}
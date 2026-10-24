import { createContext, useContext, useState, type PropsWithChildren } from 'react';
import { WORKOUTS, type Workout } from '@/data/workouts';

type WorkoutsValue = {
  workouts: Workout[];
  draft: Workout | null;
  setDraft: (workout: Workout) => void;
  saveDraft: (note: string, keepWeather: boolean) => void;
  discardDraft: () => void;
};

const WorkoutsContext = createContext<WorkoutsValue | null>(null);

export function WorkoutsProvider({ children }: PropsWithChildren) {
  const [workouts, setWorkouts] = useState<Workout[]>(WORKOUTS);
  const [draft, setDraftState] = useState<Workout | null>(null);

  const setDraft = (workout: Workout) => setDraftState(workout);

  const saveDraft = (note: string, keepWeather: boolean) => {
    if (!draft) return;
    const saved: Workout = { ...draft, note: note || undefined, weather: keepWeather ? draft.weather : undefined };
    setWorkouts((current) => [saved, ...current]);
    setDraftState(null);
  };

  const discardDraft = () => setDraftState(null);

  return (
    <WorkoutsContext.Provider value={{ workouts, draft, setDraft, saveDraft, discardDraft }}>
      {children}
    </WorkoutsContext.Provider>
  );
}

export function useWorkouts() {
  const value = useContext(WorkoutsContext);
  if (!value) throw new Error('useWorkouts must be inside WorkoutsProvider');
  return value;
}
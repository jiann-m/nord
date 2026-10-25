import { ScrollView, Text, View } from 'react-native';
import { RouteMap } from '@/components/map/RouteMap';
import { useWorkouts } from '@/context/workouts';
import type { RootScreenProps } from './types';

// TEMPORARY screens so the navigation can be tested.
// Each one is replaced by the real screen in Step 8 onwards.
export function Screen({ title }: { title: string }) {
  return (
    <View className="flex-1 items-center justify-center bg-page">
      <Text className="text-2xl font-bold text-ink">{title}</Text>
    </View>
  );
}

// Until Workout Details is built: shows the workout's route so the map can be tested
export function DetailsPlaceholder({ route }: RootScreenProps<'WorkoutDetails'>) {
  const { workouts } = useWorkouts();
  const workout = workouts.find((w) => w.id === route.params.workoutId);

  return (
    <ScrollView className="flex-1 bg-page" contentContainerClassName="gap-4 p-5">
      <Text className="text-2xl font-bold text-ink">Workout {route.params.workoutId}</Text>
      {workout ? <RouteMap points={workout.route} height={300} /> : <Text className="text-muted">Workout not found</Text>}
    </ScrollView>
  );
}
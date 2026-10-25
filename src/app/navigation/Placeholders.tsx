import { ScrollView, Text, View } from 'react-native';
import { AppButton } from '@/components/ui/AppButton';
import { RouteMap } from '@/components/map/RouteMap';
import { useWorkouts } from '@/context/workouts';
import type { RootScreenProps, TabScreenProps } from './types';

// TEMPORARY screens so the navigation can be tested.
// Each one is replaced by the real screen in Step 8 onwards.
export function Screen({ title }: { title: string }) {
  return (
    <View className="flex-1 items-center justify-center bg-page">
      <Text className="text-2xl font-bold text-ink">{title}</Text>
    </View>
  );
}

// Until Farah's Home is merged (Step 18 removes this one)
export function HomePlaceholder({ navigation }: TabScreenProps<'Home'>) {
  return (
    <View className="flex-1 justify-center gap-4 bg-page p-6">
      <Text className="text-3xl font-bold text-ink">Home</Text>
      <AppButton label="Start a workout" onPress={() => navigation.navigate('WorkoutSetup')} />
      <AppButton label="Open workout w10" variant="ghost" onPress={() => navigation.navigate('WorkoutDetails', { workoutId: 'w10' })} />
      <AppButton label="Open Goals" variant="ghost" onPress={() => navigation.navigate('Goals')} />
      <AppButton label="Open Challenges" variant="ghost" onPress={() => navigation.navigate('Challenges')} />
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
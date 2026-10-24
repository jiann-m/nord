import { View, Text } from 'react-native';
import { AppButton } from '@/components/ui/AppButton';
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

export function HomePlaceholder({ navigation }: TabScreenProps<'Home'>) {
  return (
    <View className="flex-1 justify-center gap-4 bg-page p-6">
      <Text className="text-3xl font-bold text-ink">Home</Text>
      <AppButton label="Open workout w10" onPress={() => navigation.navigate('WorkoutDetails', { workoutId: 'w10' })} />
      <AppButton label="Open Goals" variant="ghost" onPress={() => navigation.navigate('Goals')} />
    </View>
  );
}

export function DetailsPlaceholder({ route }: RootScreenProps<'WorkoutDetails'>) {
  return <Screen title={`Workout ${route.params.workoutId}`} />;
}
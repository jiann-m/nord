import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import type { RootScreenProps } from '@/app/navigation/types';
import { AppButton } from '@/components/ui/AppButton';
import { Card } from '@/components/ui/Card';
import { ErrorState } from '@/components/ui/States';
import { useTheme } from '@/context/theme';
import { ForecastRow } from '../components/ForecastRow';
import { RouteOption } from '../components/RouteOption';
import { TypePicker } from '../components/TypePicker';
import { useWorkoutSetupViewModel } from '../hooks/useWorkoutSetupViewModel';

// VIEW: choose the workout, check the weather, pick a route, start.
export function WorkoutSetupScreen({ navigation }: RootScreenProps<'WorkoutSetup'>) {
  const { colors } = useTheme();
  // replace: when the workout ends, Back goes to Home, not to this screen
  const vm = useWorkoutSetupViewModel((type, routeId) => navigation.replace('LiveTracking', { type, routeId }));

  return (
    <ScrollView className="flex-1 bg-page" contentContainerClassName="gap-4 p-5 pb-10">
      <Card title="Workout type">
        <TypePicker value={vm.type} onChange={vm.chooseType} />
      </Card>

      <Card title="Next hours">
        {vm.loading ? (
          <View className="flex-row items-center gap-3">
            <ActivityIndicator color={colors.ink} />
            <Text className="text-muted">Loading the forecast…</Text>
          </View>
        ) : vm.error ? (
          <ErrorState message={vm.error} onRetry={vm.retry} />
        ) : (
          <ForecastRow hours={vm.forecast} />
        )}
      </Card>

      <Card title="Suggested routes">
        <Text className="text-body">Optional. Without a route, Nord uses your usual loop.</Text>
        {vm.routes.map((route) => (
          <RouteOption
            key={route.id}
            name={route.name}
            distanceKm={route.distanceKm}
            selected={route.id === vm.routeId}
            onPress={() => vm.chooseRoute(route.id)}
          />
        ))}
      </Card>

      <AppButton label="Start workout" onPress={vm.start} />
    </ScrollView>
  );
}
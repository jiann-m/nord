import { ScrollView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { RootScreenProps } from '@/app/navigation/types';
import { RouteMap } from '@/components/map/RouteMap';
import { AppButton } from '@/components/ui/AppButton';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/States';
import { useTheme } from '@/context/theme';
import { DetailTile } from '../components/DetailTile';
import { SplitRow } from '../components/SplitRow';
import { useWorkoutDetailsViewModel } from '../hooks/useWorkoutDetailsViewModel';

// VIEW: everything about one saved workout, and Share.
export function WorkoutDetailsScreen({ navigation, route }: RootScreenProps<'WorkoutDetails'>) {
  const { colors } = useTheme();
  const vm = useWorkoutDetailsViewModel(route.params.workoutId);

  if (!vm.found) {
    return (
      <View className="flex-1 gap-4 bg-page p-5">
        <EmptyState title="Workout not found" message="It may have been discarded." />
        <AppButton label="Go back" variant="ghost" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-page" contentContainerClassName="gap-4 p-5 pb-10">
      <View className="gap-1">
        <Text className="text-2xl font-bold text-ink">{vm.title}</Text>
        <Text className="text-muted">{vm.subtitle}</Text>
      </View>

      <RouteMap points={vm.route} height={240} />

      <View className="flex-row flex-wrap justify-between gap-y-3">
        {vm.tiles.map((tile) => (
          <DetailTile key={tile.label} label={tile.label} value={tile.value} />
        ))}
      </View>

      <Card title="Splits">
        {vm.splits.length === 0 ? (
          <Text className="text-muted">No distance recorded.</Text>
        ) : (
          vm.splits.map((split) => <SplitRow key={split.index} label={split.label} time={split.time} share={split.share} />)
        )}
      </Card>

      <Card title="Conditions and note">
        <View className="flex-row items-center gap-3">
          <Ionicons name="partly-sunny" size={22} color={colors.ink} />
          <Text className="flex-1 capitalize text-body">{vm.weatherText ?? 'No weather saved'}</Text>
        </View>
        <View className="flex-row items-start gap-3">
          <Ionicons name="create-outline" size={22} color={colors.ink} />
          <Text className={`flex-1 ${vm.note ? 'italic text-body' : 'text-muted'}`}>{vm.note ? `“${vm.note}”` : 'No note'}</Text>
        </View>
      </Card>

      <AppButton label="Share recap" onPress={vm.share} />
      {vm.shareMessage ? <Text className="text-center text-danger">{vm.shareMessage}</Text> : null}
    </ScrollView>
  );
}
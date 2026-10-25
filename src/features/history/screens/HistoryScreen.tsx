import { FlatList, Text, View } from 'react-native';
import type { TabScreenProps } from '@/app/navigation/types';
import { EmptyState } from '@/components/ui/States';
import { HistoryFilter } from '../components/HistoryFilter';
import { WorkoutRow } from '../components/WorkoutRow';
import { useHistoryViewModel } from '../hooks/useHistoryViewModel';

// VIEW: every saved workout, newest first, with a type filter.
export function HistoryScreen({ navigation }: TabScreenProps<'History'>) {
  const vm = useHistoryViewModel();

  return (
    <FlatList
      className="flex-1 bg-page"
      contentContainerClassName="gap-3 p-5 pb-10"
      data={vm.rows}
      keyExtractor={(row) => row.id}
      ListHeaderComponent={
        <View className="gap-3 pb-1">
          <HistoryFilter value={vm.filter} onChange={vm.setFilter} />
          <Text className="text-muted">{vm.totalsText}</Text>
        </View>
      }
      ListEmptyComponent={<EmptyState title="No workouts here" message="Workouts of this type will show up here." />}
      renderItem={({ item }) => (
        <WorkoutRow
          type={item.type}
          title={item.title}
          date={item.date}
          distance={item.distance}
          details={item.details}
          note={item.note}
          onPress={() => navigation.navigate('WorkoutDetails', { workoutId: item.id })}
        />
      )}
    />
  );
}
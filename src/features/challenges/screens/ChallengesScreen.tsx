import { FlatList, Text, View } from 'react-native';
import { EmptyState, ErrorState, LoadingState } from '@/components/ui/States';
import { ChallengeCard } from '../components/ChallengeCard';
import { FilterPicker } from '../components/FilterPicker';
import { useChallengesViewModel } from '../hooks/useChallengesViewModel';

// VIEW: loading, error, empty or the list (Lab 03 interaction states).
export function ChallengesScreen() {
  const vm = useChallengesViewModel();

  if (vm.loading) {
    return (
      <View className="flex-1 bg-page p-5">
        <LoadingState label="Loading challenges…" />
      </View>
    );
  }

  if (vm.error) {
    return (
      <View className="flex-1 bg-page p-5">
        <ErrorState message={vm.error} onRetry={vm.retry} />
      </View>
    );
  }

  return (
    <FlatList
      className="flex-1 bg-page"
      contentContainerClassName="gap-4 p-5 pb-10"
      data={vm.visible}
      keyExtractor={(challenge) => challenge.id}
      ListHeaderComponent={
        <View className="gap-3">
          <FilterPicker value={vm.filter} onChange={vm.setFilter} />
          <Text className="text-muted">{vm.joinedText}</Text>
        </View>
      }
      ListEmptyComponent={<EmptyState title={vm.emptyTitle} message="Pick a challenge from All to get started." />}
      renderItem={({ item }) => <ChallengeCard challenge={item} onToggle={() => vm.toggleJoin(item.id)} />}
    />
  );
}
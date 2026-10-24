import { FlatList, Text, View } from 'react-native';
import type { TabScreenProps } from '@/app/navigation/types';
import { AppButton } from '@/components/ui/AppButton';
import { Card } from '@/components/ui/Card';
import { EmptyState, ErrorState, LoadingState } from '@/components/ui/States';
import { PeriodPicker } from '../components/PeriodPicker';
import { RankRow } from '../components/RankRow';
import { useLeaderboardViewModel } from '../hooks/useLeaderboardViewModel';

// VIEW: loading, error or the ranking.
export function LeaderboardScreen({ navigation }: TabScreenProps<'Leaderboard'>) {
  const vm = useLeaderboardViewModel();

  if (vm.loading) {
    return (
      <View className="flex-1 bg-page p-5">
        <LoadingState label="Loading leaderboard…" />
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
      contentContainerClassName="gap-3 p-5 pb-10"
      data={vm.hasFriends ? vm.rows : []}
      keyExtractor={(row) => row.id}
      ListHeaderComponent={
        <View className="gap-4 pb-1">
          <PeriodPicker value={vm.period} onChange={vm.setPeriod} />
          <Card title={`Your rank ${vm.rankText}`}>
            <Text className="text-body">{vm.gapText}</Text>
            <AppButton label="See group challenges" variant="ghost" onPress={() => navigation.navigate('Challenges')} />
          </Card>
        </View>
      }
      ListEmptyComponent={<EmptyState title="No friends yet" message="Add friends to compare your distance." />}
      renderItem={({ item }) => <RankRow row={item} units={vm.units} />}
    />
  );
}
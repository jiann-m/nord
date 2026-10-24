import { ScrollView, Text, View } from 'react-native';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { EmptyState } from '@/components/ui/States';
import { BarChart } from '../components/BarChart';
import { PeriodPicker } from '../components/PeriodPicker';
import { StatTile } from '../components/StatTile';
import { useStatsViewModel } from '../hooks/useStatsViewModel';

// VIEW: only shows what the view-model gives it.
export function StatsScreen() {
  const vm = useStatsViewModel();

  return (
    <ScrollView className="flex-1 bg-page" contentContainerClassName="gap-4 p-5 pb-10">
      <PeriodPicker value={vm.period} onChange={vm.setPeriod} />

      {vm.isEmpty ? (
        <EmptyState title={vm.emptyTitle} message="Start a workout and your progress will show up here." />
      ) : (
        <>
          <Card title="Totals">
            <View className="flex-row flex-wrap justify-between gap-y-3">
              {vm.tiles.map((tile) => (
                <StatTile key={tile.label} label={tile.label} value={tile.value} />
              ))}
            </View>
            <Text className="text-body">{vm.changeText}</Text>
          </Card>

          <Card title={vm.period === 'week' ? 'Distance per day (km)' : 'Distance per week (km)'}>
            <BarChart bars={vm.bars} units={vm.units} />
          </Card>

          <Card title="By workout type">
            {vm.typeRows.map((row) => (
              <ProgressBar key={row.type} label={row.label} value={row.share} caption={row.caption} />
            ))}
          </Card>
        </>
      )}
    </ScrollView>
  );
}
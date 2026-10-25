import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { RootScreenProps } from '@/app/navigation/types';
import { RouteMap } from '@/components/map/RouteMap';
import { AppButton } from '@/components/ui/AppButton';
import { LiveStat } from '../components/LiveStat';
import { StopConfirm } from '../components/StopConfirm';
import { useLiveTrackingViewModel } from '../hooks/useLiveTrackingViewModel';

// VIEW: full screen (no header) while a workout is being recorded.
export function LiveTrackingScreen({ navigation, route }: RootScreenProps<'LiveTracking'>) {
  // replace: Back from the summary must not return to a finished workout
  const vm = useLiveTrackingViewModel(route.params.type, route.params.routeId, () => navigation.replace('WorkoutSummary'));

  return (
    <SafeAreaView className="flex-1 bg-page">
      <ScrollView contentContainerClassName="gap-4 p-5 pb-10">
        <View className="flex-row items-center justify-between">
          <Text className="text-2xl font-bold text-ink">{vm.title}</Text>
          <View className="flex-row items-center gap-2 rounded-full border border-line px-3 py-1">
            <View className={`h-2.5 w-2.5 rounded-full ${vm.running ? 'bg-danger' : 'bg-muted'}`} />
            <Text className="font-bold text-ink">{vm.running ? 'Recording' : 'Paused'}</Text>
          </View>
        </View>

        <RouteMap points={vm.path} height={280} live />

        <View className="items-center">
          <Text className="text-6xl font-bold text-ink" accessibilityLabel={`Time ${vm.time}`}>{vm.time}</Text>
          <Text className="text-muted">Simulated GPS · 6× speed</Text>
        </View>

        <View className="flex-row flex-wrap justify-between gap-y-3">
          {vm.tiles.map((tile) => (
            <LiveStat key={tile.label} label={tile.label} value={tile.value} />
          ))}
        </View>

        {vm.confirmingStop ? (
          <StopConfirm onKeepGoing={vm.keepGoing} onFinish={vm.finish} />
        ) : (
          <View className="flex-row gap-3">
            <View className="flex-1">
              <AppButton label={vm.running ? 'Pause' : 'Resume'} variant="ghost" onPress={vm.togglePause} />
            </View>
            <View className="flex-1">
              <AppButton label="Stop" variant="danger" onPress={vm.askStop} />
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
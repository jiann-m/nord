import { KeyboardAvoidingView, Platform, ScrollView, Switch, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { RootScreenProps } from '@/app/navigation/types';
import { RouteMap } from '@/components/map/RouteMap';
import { AppButton } from '@/components/ui/AppButton';
import { AppInput } from '@/components/ui/AppInput';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/States';
import { useTheme } from '@/context/theme';
import { SummaryTile } from '../components/SummaryTile';
import { useWorkoutSummaryViewModel } from '../hooks/useWorkoutSummaryViewModel';

// VIEW: the result of the workout that just ended, then Save or Discard.
export function WorkoutSummaryScreen({ navigation }: RootScreenProps<'WorkoutSummary'>) {
  const { colors } = useTheme();
  // reset: after saving or discarding, Back cannot return to the summary
  const vm = useWorkoutSummaryViewModel(
    () => navigation.reset({ index: 0, routes: [{ name: 'Main', params: { screen: 'History' } }] }),
    () => navigation.reset({ index: 0, routes: [{ name: 'Main', params: { screen: 'Home' } }] }),
  );

  if (!vm.hasDraft) {
    return (
      <View className="flex-1 gap-4 bg-page p-5">
        <EmptyState title="No workout to show" message="Finish a workout to see its summary here." />
        <AppButton label="Back to Home" variant="ghost" onPress={() => navigation.navigate('Main', { screen: 'Home' })} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView className="flex-1 bg-page" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerClassName="gap-4 p-5 pb-10" keyboardShouldPersistTaps="handled">
        <Text className="text-2xl font-bold text-ink">{vm.title} finished</Text>

        {vm.isRecord ? (
          <View className="flex-row items-center gap-3 rounded-2xl bg-ink p-4" accessibilityLiveRegion="polite">
            <Ionicons name="trophy" size={24} color={colors.onInk} />
            <Text className="flex-1 font-bold text-on-ink">New personal record: your longest {vm.title.toLowerCase()} yet!</Text>
          </View>
        ) : null}

        <RouteMap points={vm.route} height={220} />

        <View className="flex-row flex-wrap justify-between gap-y-3">
          {vm.tiles.map((tile) => (
            <SummaryTile key={tile.label} label={tile.label} value={tile.value} />
          ))}
        </View>

        <Card title="Weather">
          <View className="flex-row items-center justify-between gap-3">
            <View className="flex-1 gap-1">
              <Text className="font-bold capitalize text-ink">{vm.weatherText}</Text>
              <Text className="text-xs text-muted">Attach today's weather to this workout</Text>
            </View>
            <Switch
              value={vm.attachWeather}
              onValueChange={vm.setAttachWeather}
              disabled={!vm.weatherReady}
              trackColor={{ false: colors.line, true: colors.ink }}
              accessibilityLabel="Attach today's weather"
            />
          </View>
        </Card>

        <Card title="Note">
          <AppInput
            label="How did it feel? (optional)"
            placeholder="Felt strong on the last lap."
            multiline
            maxLength={vm.noteLimit}
            value={vm.note}
            onChangeText={vm.setNote}
            style={{ minHeight: 80, textAlignVertical: 'top' }}
          />
          <Text className="self-end text-xs text-muted">{vm.noteCount}</Text>
        </Card>

        <AppButton label="Save workout" onPress={vm.save} />
        <AppButton label={vm.confirmingDiscard ? 'Tap again to discard' : 'Discard'} variant="danger" onPress={vm.discard} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
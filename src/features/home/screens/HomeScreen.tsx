import { Pressable, ScrollView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { TabScreenProps } from '@/app/navigation/types';
import { AppButton } from '@/components/ui/AppButton';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { ScreenTitle } from '@/components/ui/ScreenTitle';
import { EmptyState } from '@/components/ui/States';
import { useTheme } from '@/context/theme';
import { ShortcutTile } from '../components/ShortcutTile';
import { WeatherCard } from '../components/WeatherCard';
import { useHomeViewModel } from '../hooks/useHomeViewModel';

// VIEW: the dashboard; every number comes from the view-model.
export function HomeScreen({ navigation }: TabScreenProps<'Home'>) {
  const vm = useHomeViewModel();
  const { colors } = useTheme();

  return (
    <ScrollView className="flex-1 bg-page" contentContainerClassName="gap-4 p-5 pb-10">
      <ScreenTitle eyebrow={vm.dateText} title={vm.title} />
      <View className="flex-row items-center gap-2 self-start rounded-full border border-line px-3 py-1">
        <Ionicons name="flame" size={16} color={colors.ink} />
        <Text className="font-bold text-ink">{vm.streakText}</Text>
      </View>

      <Card title="Your goals">
        <ProgressBar label="Steps today" value={vm.stepsProgress} caption={vm.stepsCaption} />
        <ProgressBar label="Distance this week" value={vm.distanceProgress} caption={vm.distanceCaption} />
      </Card>

      <WeatherCard
        loading={vm.weatherLoading}
        error={vm.weatherError}
        onRetry={vm.retryWeather}
        icon={vm.weatherIcon}
        text={vm.weatherText}
        advice={vm.weatherAdvice}
      />

      <AppButton label="Start a workout" onPress={() => navigation.navigate('WorkoutSetup')} />

      <View className="flex-row gap-3">
        <ShortcutTile label="Goals" icon="flag" onPress={() => navigation.navigate('Goals')} />
        <ShortcutTile label="Badges" icon="medal" onPress={() => navigation.navigate('Achievements')} />
        <ShortcutTile label="Challenges" icon="people" onPress={() => navigation.navigate('Challenges')} />
      </View>

      {vm.lastWorkout ? (
        <Pressable
          onPress={() => vm.lastWorkout && navigation.navigate('WorkoutDetails', { workoutId: vm.lastWorkout.id })}
          accessibilityRole="button"
          accessibilityLabel={`Last workout: ${vm.lastWorkout.title}, ${vm.lastWorkout.numbers}`}
          className="active:opacity-70"
        >
          <Card title="Last workout">
            <View className="flex-row items-center justify-between">
              <View className="gap-1">
                <Text className="text-lg font-bold text-ink">{vm.lastWorkout.title}</Text>
                <Text className="text-muted">{vm.lastWorkout.date}</Text>
              </View>
              <Ionicons name="chevron-forward" size={22} color={colors.muted} />
            </View>
            <Text className="text-body">{vm.lastWorkout.numbers}</Text>
          </Card>
        </Pressable>
      ) : (
        <EmptyState title="No workouts yet" message="Tap Start a workout to record your first one." />
      )}
    </ScrollView>
  );
}
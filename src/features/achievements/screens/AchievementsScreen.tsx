import { ScrollView, Text, View } from 'react-native';
import type { RootScreenProps } from '@/app/navigation/types';
import { Card } from '@/components/ui/Card';
import { BadgeTile } from '../components/BadgeTile';
import { RecordRow } from '../components/RecordRow';
import { WeekDots } from '../components/WeekDots';
import { useAchievementsViewModel } from '../hooks/useAchievementsViewModel';

// VIEW: only shows what the view-model gives it.
export function AchievementsScreen({ navigation }: RootScreenProps<'Achievements'>) {
  const vm = useAchievementsViewModel();

  return (
    <ScrollView className="flex-1 bg-page" contentContainerClassName="gap-4 p-5 pb-10">
      <Card title="Current streak">
        <Text className="text-4xl font-bold text-ink">{vm.streakText}</Text>
        <Text className="text-muted">{vm.bestText}</Text>
        <WeekDots days={vm.week} />
      </Card>

      <Card title={vm.badgesTitle}>
        <View className="flex-row flex-wrap justify-between gap-y-3">
          {vm.badges.map((badge) => (
            <BadgeTile
              key={badge.id}
              title={badge.title}
              description={badge.description}
              icon={badge.icon}
              earned={badge.earned}
              progress={badge.progress}
              progressText={badge.progressText}
            />
          ))}
        </View>
      </Card>

      <Card title="Personal records">
        <View>
          {vm.recordRows.map((row) => {
            const workoutId = row.workoutId;
            return (
              <RecordRow
                key={row.label}
                label={row.label}
                value={row.value}
                date={row.date}
                onPress={workoutId ? () => navigation.navigate('WorkoutDetails', { workoutId }) : undefined}
              />
            );
          })}
        </View>
      </Card>
    </ScrollView>
  );
}
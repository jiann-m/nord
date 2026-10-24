import { Text, View } from 'react-native';
import type { Challenge } from '@/data/challenges';
import { AppButton } from '@/components/ui/AppButton';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';

type Props = { challenge: Challenge; onToggle: () => void };

// One challenge: who it is for, the goal, the progress and Join / Leave
export function ChallengeCard({ challenge, onToggle }: Props) {
  const who = challenge.kind === 'team' ? `Team · ${challenge.members} members` : 'Solo';
  const caption = `${challenge.progressKm} of ${challenge.targetKm} km · ${challenge.daysLeft} days left`;

  return (
    <Card title={challenge.title}>
      <View className="flex-row gap-2">
        <Text className="rounded-full border border-line px-3 py-1 text-xs font-bold text-ink">{who}</Text>
        {challenge.joined ? (
          <Text className="rounded-full bg-ink px-3 py-1 text-xs font-bold text-on-ink">Joined ✓</Text>
        ) : null}
      </View>
      <Text className="text-body">{challenge.description}</Text>
      <ProgressBar label="Progress" value={challenge.progressKm / challenge.targetKm} caption={caption} />
      <AppButton
        label={challenge.joined ? 'Leave challenge' : 'Join challenge'}
        variant={challenge.joined ? 'ghost' : 'primary'}
        onPress={onToggle}
      />
    </Card>
  );
}
import { Text, View } from 'react-native';
import { AppButton } from '@/components/ui/AppButton';

type Props = { onKeepGoing: () => void; onFinish: () => void };

// Shown instead of the controls when Stop is pressed, so a workout is never ended by mistake
export function StopConfirm({ onKeepGoing, onFinish }: Props) {
  return (
    <View className="gap-3 rounded-2xl border border-line bg-card p-4" accessibilityLiveRegion="polite">
      <Text className="text-lg font-bold text-ink">End this workout?</Text>
      <Text className="text-body">The clock is paused. You can keep going or see the summary.</Text>
      <AppButton label="Keep going" variant="ghost" onPress={onKeepGoing} />
      <AppButton label="End and see summary" variant="danger" onPress={onFinish} />
    </View>
  );
}
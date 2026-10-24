import { View, Text } from 'react-native';

type Props = { label: string; value: number; caption: string };

// value is between 0 and 1
export function ProgressBar({ label, value, caption }: Props) {
  const percent = Math.round(Math.min(1, value) * 100);

  return (
    <View className="gap-2" accessibilityRole="progressbar" accessibilityLabel={`${label} ${percent}%`}>
      <View className="flex-row justify-between">
        <Text className="font-semibold text-ink">{label}</Text>
        <Text className="font-bold text-ink">{percent}%</Text>
      </View>
      <View className="h-2 overflow-hidden rounded-full bg-track">
        <View className="h-full rounded-full bg-ink" style={{ width: `${percent}%` }} />
      </View>
      <Text className="text-xs text-muted">{caption}</Text>
    </View>
  );
}
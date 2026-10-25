import { Text, View } from 'react-native';

type Props = { label: string; time: string; share: number };

// One km of the workout: its label, a bar and its time
export function SplitRow({ label, time, share }: Props) {
  return (
    <View className="flex-row items-center gap-3" accessible accessibilityLabel={`${label}: ${time}`}>
      <Text className="w-24 text-body">{label}</Text>
      <View className="h-2 flex-1 overflow-hidden rounded-full bg-track">
        <View className="h-2 rounded-full bg-ink" style={{ width: `${Math.round(share * 100)}%` }} />
      </View>
      <Text className="w-16 text-right font-bold text-ink">{time}</Text>
    </View>
  );
}
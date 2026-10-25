import { Text, View } from 'react-native';

type Props = { label: string; value: string };

// One live number; two fit in a row
export function LiveStat({ label, value }: Props) {
  return (
    <View className="w-[47%] gap-1 rounded-xl bg-card p-3">
      <Text className="text-xl font-bold text-ink">{value}</Text>
      <Text className="text-xs text-muted">{label}</Text>
    </View>
  );
}
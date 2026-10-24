import { Text, View } from 'react-native';

type Props = { label: string; value: string };

// One number with a small label under it; two tiles fit in a row
export function StatTile({ label, value }: Props) {
  return (
    <View className="w-[47%] gap-1 rounded-xl border border-line p-3">
      <Text className="text-xl font-bold text-ink">{value}</Text>
      <Text className="text-sm text-muted">{label}</Text>
    </View>
  );
}
import { Text, View } from 'react-native';

type Props = { label: string; value: string };

// One number of the workout; two fit in a row
export function DetailTile({ label, value }: Props) {
  return (
    <View className="w-[47%] gap-1 rounded-xl border border-line p-3">
      <Text className="text-lg font-bold text-ink">{value}</Text>
      <Text className="text-xs text-muted">{label}</Text>
    </View>
  );
}
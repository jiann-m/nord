import { Pressable, Text, View } from 'react-native';

type Props = { label: string; value: string; date: string; onPress?: () => void };

// One personal record; tapping it opens the workout it came from
export function RecordRow({ label, value, date, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole="button"
      accessibilityLabel={`${label}: ${value}, ${date}`}
      className="flex-row items-center justify-between border-b border-line py-3 active:opacity-70"
    >
      <View className="gap-1">
        <Text className="font-bold text-ink">{label}</Text>
        <Text className="text-xs text-muted">{date}</Text>
      </View>
      <Text className="text-lg font-bold text-ink">{value}</Text>
    </Pressable>
  );
}
import { Text, View } from 'react-native';

type Props = { days: { day: number; letter: string; active: boolean }[] };

// Seven circles, oldest day on the left; a filled circle = at least one workout that day
export function WeekDots({ days }: Props) {
  return (
    <View className="flex-row justify-between">
      {days.map((item) => (
        <View key={item.day} className="items-center gap-1" accessible accessibilityLabel={`${item.letter}: ${item.active ? 'workout' : 'no workout'}`}>
          <View className={`h-8 w-8 rounded-full ${item.active ? 'bg-ink' : 'border border-line'}`} />
          <Text className="text-xs text-muted">{item.letter}</Text>
        </View>
      ))}
    </View>
  );
}
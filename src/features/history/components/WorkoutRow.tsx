import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/theme';
import type { WorkoutType } from '@/data/workouts';

type Props = {
  type: WorkoutType;
  title: string;
  date: string;
  distance: string;
  details: string;
  note?: string;
  onPress: () => void;
};

const ICONS = { running: 'fitness', walking: 'walk', cycling: 'bicycle' } as const;

// One past workout; tapping it opens its details
export function WorkoutRow({ type, title, date, distance, details, note, onPress }: Props) {
  const { colors } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${title} on ${date}, ${distance}, ${details}`}
      className="flex-row items-center gap-4 rounded-2xl bg-card p-4 active:opacity-70"
    >
      <View className="h-11 w-11 items-center justify-center rounded-full border border-line">
        <Ionicons name={ICONS[type]} size={22} color={colors.ink} />
      </View>
      <View className="flex-1 gap-1">
        <View className="flex-row justify-between">
          <Text className="font-bold text-ink">{title}</Text>
          <Text className="font-bold text-ink">{distance}</Text>
        </View>
        <Text className="text-xs text-muted">{date} · {details}</Text>
        {note ? <Text className="text-xs italic text-body" numberOfLines={1}>“{note}”</Text> : null}
      </View>
    </Pressable>
  );
}
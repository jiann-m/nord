import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/theme';
import type { WorkoutType } from '@/data/workouts';

type Props = { value: WorkoutType; onChange: (type: WorkoutType) => void };

const OPTIONS = [
  { type: 'running', label: 'Run', icon: 'fitness' },
  { type: 'walking', label: 'Walk', icon: 'walk' },
  { type: 'cycling', label: 'Ride', icon: 'bicycle' },
] as const;

// Three big buttons with an icon; the chosen one is filled
export function TypePicker({ value, onChange }: Props) {
  const { colors } = useTheme();

  return (
    <View className="flex-row gap-3">
      {OPTIONS.map((option) => {
        const selected = option.type === value;
        return (
          <Pressable
            key={option.type}
            onPress={() => onChange(option.type)}
            accessibilityRole="radio"
            accessibilityState={{ selected }}
            accessibilityLabel={option.label}
            className={`flex-1 items-center gap-2 rounded-2xl py-5 active:opacity-70 ${selected ? 'bg-ink' : 'border border-line'}`}
          >
            <Ionicons name={option.icon} size={28} color={selected ? colors.onInk : colors.ink} />
            <Text className={`font-bold ${selected ? 'text-on-ink' : 'text-ink'}`}>{option.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
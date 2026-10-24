import { Pressable, Text, View } from 'react-native';
import type { Period } from '../api';

type Props = { value: Period; onChange: (period: Period) => void };

const OPTIONS = [
  { period: 'week', label: 'This week' },
  { period: 'month', label: 'Last 4 weeks' },
] as const;

// Two buttons side by side; the chosen one is filled
export function PeriodPicker({ value, onChange }: Props) {
  return (
    <View className="flex-row gap-3">
      {OPTIONS.map((option) => {
        const selected = option.period === value;
        return (
          <Pressable
            key={option.period}
            onPress={() => onChange(option.period)}
            accessibilityRole="radio"
            accessibilityState={{ selected }}
            className={`flex-1 rounded-xl px-3 py-3 active:opacity-70 ${selected ? 'bg-ink' : 'border border-line'}`}
          >
            <Text className={`text-center font-bold ${selected ? 'text-on-ink' : 'text-ink'}`}>{option.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
import { Pressable, Text, View } from 'react-native';
import type { Units } from '@/data/profile';

type Props = { value: Units; onChange: (units: Units) => void };

const OPTIONS = [
  { units: 'metric', label: 'Metric (km, kg)' },
  { units: 'imperial', label: 'Imperial (mi, lb)' },
] as const;

// Two buttons side by side; the chosen one is filled
export function UnitsPicker({ value, onChange }: Props) {
  return (
    <View className="flex-row gap-3">
      {OPTIONS.map((option) => {
        const selected = option.units === value;
        return (
          <Pressable
            key={option.units}
            onPress={() => onChange(option.units)}
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
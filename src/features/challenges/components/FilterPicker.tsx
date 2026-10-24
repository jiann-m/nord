import { Pressable, Text, View } from 'react-native';
import type { Filter } from '../hooks/useChallengesViewModel';

type Props = { value: Filter; onChange: (filter: Filter) => void };

const OPTIONS = [
  { filter: 'all', label: 'All' },
  { filter: 'joined', label: 'Joined' },
  { filter: 'open', label: 'Open' },
] as const;

// Three buttons side by side; the chosen one is filled
export function FilterPicker({ value, onChange }: Props) {
  return (
    <View className="flex-row gap-3">
      {OPTIONS.map((option) => {
        const selected = option.filter === value;
        return (
          <Pressable
            key={option.filter}
            onPress={() => onChange(option.filter)}
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
import { Pressable, Text, View } from 'react-native';

type Props = { name: string; distanceKm: number; selected: boolean; onPress: () => void };

// One suggested route; the chosen one is filled
export function RouteOption({ name, distanceKm, selected, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      className={`flex-row items-center justify-between rounded-xl px-4 py-3 active:opacity-70 ${selected ? 'bg-ink' : 'border border-line'}`}
    >
      <View className="gap-1">
        <Text className={`font-bold ${selected ? 'text-on-ink' : 'text-ink'}`}>{name}</Text>
        <Text className={`text-xs ${selected ? 'text-on-ink' : 'text-muted'}`}>{distanceKm} km loop</Text>
      </View>
      <Text className={`font-bold ${selected ? 'text-on-ink' : 'text-muted'}`}>{selected ? 'Chosen ✓' : 'Choose'}</Text>
    </Pressable>
  );
}
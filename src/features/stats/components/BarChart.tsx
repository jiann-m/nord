import { Text, View } from 'react-native';
import type { Units } from '@/data/profile';
import { formatDistance } from '@/services/format';

type Props = { bars: { label: string; distanceKm: number }[]; units: Units };

// A simple bar chart made of Views: each bar's height is its share of the tallest bar
export function BarChart({ bars, units }: Props) {
  const tallest = Math.max(...bars.map((bar) => bar.distanceKm), 1);

  return (
    <View className="h-48 flex-row items-end gap-2">
      {bars.map((bar) => (
        <View
          key={bar.label}
          className="h-full flex-1 items-center justify-end gap-1"
          accessible
          accessibilityLabel={`${bar.label}: ${formatDistance(bar.distanceKm, units)}`}
        >
          <Text className="text-xs text-muted">{bar.distanceKm > 0 ? bar.distanceKm.toFixed(1) : ''}</Text>
          <View
            className={`w-full rounded-t-md ${bar.distanceKm > 0 ? 'bg-ink' : 'bg-track'}`}
            style={{ height: `${Math.max((bar.distanceKm / tallest) * 75, 3)}%` }}
          />
          <Text className="text-xs text-muted">{bar.label}</Text>
        </View>
      ))}
    </View>
  );
}
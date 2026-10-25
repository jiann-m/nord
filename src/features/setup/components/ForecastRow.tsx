import { ScrollView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/theme';
import type { HourForecast } from '../api';

const ICONS = { sunny: 'sunny', cloudy: 'cloudy', windy: 'flag', rainy: 'rainy' } as const;

// The next hours side by side; scrolls sideways if there are many
export function ForecastRow({ hours }: { hours: HourForecast[] }) {
  const { colors } = useTheme();

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-3">
      {hours.map((item) => (
        <View
          key={item.hour}
          className="w-16 items-center gap-1 rounded-xl border border-line py-3"
          accessible
          accessibilityLabel={`${item.hour}: ${item.tempC} degrees, ${item.condition}`}
        >
          <Text className="text-xs text-muted">{item.hour}</Text>
          <Ionicons name={ICONS[item.condition]} size={22} color={colors.ink} />
          <Text className="font-bold text-ink">{item.tempC}°</Text>
        </View>
      ))}
    </ScrollView>
  );
}
import { ActivityIndicator, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppButton } from '@/components/ui/AppButton';
import { Card } from '@/components/ui/Card';
import { useTheme } from '@/context/theme';

type Props = {
  loading: boolean;
  error: string;
  onRetry: () => void;
  icon: 'sunny' | 'cloudy' | 'flag' | 'rainy' | null;
  text: string;
  advice: string;
};

// Weather has its own loading and error states, so the rest of Home still shows
export function WeatherCard({ loading, error, onRetry, icon, text, advice }: Props) {
  const { colors } = useTheme();

  return (
    <Card title="Weather now">
      {loading ? (
        <View className="flex-row items-center gap-3">
          <ActivityIndicator color={colors.ink} />
          <Text className="text-muted">Checking the weather…</Text>
        </View>
      ) : error ? (
        <View className="gap-3">
          <Text className="text-danger">{error}</Text>
          <AppButton label="Try again" variant="danger" onPress={onRetry} />
        </View>
      ) : (
        <View className="flex-row items-center gap-4">
          {icon ? <Ionicons name={icon} size={36} color={colors.ink} /> : null}
          <View className="flex-1 gap-1">
            <Text className="text-xl font-bold capitalize text-ink">{text}</Text>
            <Text className="text-body">{advice}</Text>
          </View>
        </View>
      )}
    </Card>
  );
}
import { ActivityIndicator, View, Text } from 'react-native';
import { AppButton } from './AppButton';
import { useTheme } from '@/context/theme';

export function LoadingState({ label }: { label: string }) {
  const { colors } = useTheme();

  return (
    <View className="items-center gap-3 py-10">
      <ActivityIndicator color={colors.ink} />
      <Text className="text-muted">{label}</Text>
    </View>
  );
}

export function EmptyState({ title, message }: { title: string; message: string }) {
  return (
    <View className="items-center gap-2 rounded-2xl border border-dashed border-line p-8">
      <Text className="text-lg font-bold text-ink">{title}</Text>
      <Text className="text-center text-muted">{message}</Text>
    </View>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <View className="gap-3 rounded-2xl bg-rose-500/10 p-5">
      <Text className="text-danger">{message}</Text>
      <AppButton label="Try again" variant="danger" onPress={onRetry} />
    </View>
  );
}
import { View, Text } from 'react-native';

type Props = { eyebrow: string; title: string };

export function ScreenTitle({ eyebrow, title }: Props) {
  return (
    <View className="gap-1">
      <Text className="text-xs font-bold uppercase tracking-widest text-ink">{eyebrow}</Text>
      <Text className="text-3xl font-bold text-ink">{title}</Text>
    </View>
  );
}
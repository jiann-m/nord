import type { PropsWithChildren } from 'react';
import { View, Text } from 'react-native';

type Props = PropsWithChildren<{ title?: string }>;

export function Card({ title, children }: Props) {
  return (
    <View className="gap-4 rounded-2xl bg-card p-5">
      {title && <Text className="text-xl font-bold text-ink">{title}</Text>}
      {children}
    </View>
  );
}
import { Pressable, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/theme';

type Props = { label: string; icon: 'flag' | 'medal' | 'people'; onPress: () => void };

// A small square button with an icon; three of them sit in a row
export function ShortcutTile({ label, icon, onPress }: Props) {
  const { colors } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      className="flex-1 items-center gap-2 rounded-xl border border-line py-4 active:opacity-70"
    >
      <Ionicons name={icon} size={24} color={colors.ink} />
      <Text className="font-bold text-ink">{label}</Text>
    </Pressable>
  );
}
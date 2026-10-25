import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/theme';
import type { BadgeIcon } from '../api';

type Props = {
  title: string;
  description: string;
  icon: BadgeIcon;
  earned: boolean;
  progress: number;
  progressText: string;
};

// One badge: filled icon when earned, outlined with a small progress bar when still locked
export function BadgeTile({ title, description, icon, earned, progress, progressText }: Props) {
  const { colors } = useTheme();
  const percent = Math.round(Math.min(progress, 1) * 100);

  return (
    <View
      className="w-[47%] gap-2 rounded-xl border border-line p-3"
      accessible
      accessibilityLabel={`${title}, ${earned ? 'earned' : `locked, ${progressText}`}`}
    >
      <View className={`h-12 w-12 items-center justify-center rounded-full ${earned ? 'bg-ink' : 'border border-line opacity-50'}`}>
        <Ionicons name={icon} size={22} color={earned ? colors.onInk : colors.muted} />
      </View>
      <Text className={`font-bold ${earned ? 'text-ink' : 'text-muted'}`}>{title}</Text>
      <Text className="text-xs text-muted">{description}</Text>
      {earned ? null : (
        <View className="h-1.5 overflow-hidden rounded-full bg-track">
          <View className="h-1.5 rounded-full bg-ink" style={{ width: `${percent}%` }} />
        </View>
      )}
      <Text className="text-xs font-bold text-body">{progressText}</Text>
    </View>
  );
}
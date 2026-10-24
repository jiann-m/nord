import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/theme';

// Sun in dark mode (tap for light), moon in light mode (tap for dark)
export function ThemeToggle() {
  const { mode, colors, toggleMode } = useTheme();

  return (
    <Pressable
      onPress={toggleMode}
      accessibilityRole="button"
      accessibilityLabel={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      hitSlop={12}
      className="p-2 active:opacity-70"
    >
      <Ionicons name={mode === 'dark' ? 'sunny-outline' : 'moon-outline'} size={22} color={colors.ink} />
    </Pressable>
  );
}
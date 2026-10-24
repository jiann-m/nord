import { createContext, useContext, useState, type PropsWithChildren } from 'react';
import { View } from 'react-native';
import { vars } from 'nativewind';
import { themes, type ThemeName } from '@/theme/tokens';

type ThemeValue = {
  mode: ThemeName;
  colors: (typeof themes)[ThemeName];
  toggleMode: () => void;
};

const ThemeContext = createContext<ThemeValue | null>(null);

// '#F2EEE3' -> '242 238 227' (the format the colour variables in tailwind.config.js use)
function toRgb(hex: string) {
  const red = parseInt(hex.slice(1, 3), 16);
  const green = parseInt(hex.slice(3, 5), 16);
  const blue = parseInt(hex.slice(5, 7), 16);
  return `${red} ${green} ${blue}`;
}

// The values behind bg-page, text-ink, ... for one mode (NativeWind docs: vars)
function cssVariables(mode: ThemeName) {
  const c = themes[mode];
  return vars({
    '--color-page': toRgb(c.page),
    '--color-card': toRgb(c.card),
    '--color-line': toRgb(c.line),
    '--color-track': toRgb(c.track),
    '--color-ink': toRgb(c.ink),
    '--color-on-ink': toRgb(c.onInk),
    '--color-body': toRgb(c.body),
    '--color-muted': toRgb(c.muted),
    '--color-danger': toRgb(c.danger),
  });
}

// Same pattern as the Lab 02 context: state in the provider, a hook to read it
export function ThemeProvider({ children }: PropsWithChildren) {
  const [mode, setMode] = useState<ThemeName>('dark');

  const toggleMode = () => setMode((current) => (current === 'dark' ? 'light' : 'dark'));

  return (
    <ThemeContext.Provider value={{ mode, colors: themes[mode], toggleMode }}>
      <View className="flex-1" style={cssVariables(mode)}>
        {children}
      </View>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const value = useContext(ThemeContext);
  if (!value) throw new Error('useTheme must be inside ThemeProvider');
  return value;
}
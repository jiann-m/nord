import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import type { MainTabParamList } from './types';
import { useTheme } from '@/context/theme';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { HomePlaceholder } from './Placeholders';
import { ProfileScreen } from '@/features/profile/screens/ProfileScreen';
import { StatsScreen } from '@/features/stats/screens/StatsScreen';
import { LeaderboardScreen } from '@/features/leaderboard/screens/LeaderboardScreen';
import { HistoryScreen } from '@/features/history/screens/HistoryScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

const ICONS = { Home: 'home', History: 'time', Stats: 'stats-chart', Leaderboard: 'trophy', Profile: 'person' } as const;

// Tabs: five equal areas, one tap apart (Lab 03)
export function MainTabs() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => <Ionicons name={ICONS[route.name]} color={color} size={size} />,
        tabBarActiveTintColor: colors.ink,
        tabBarInactiveTintColor: colors.muted,
        headerRight: () => <ThemeToggle />,
      })}
    >
      <Tab.Screen name="Home" component={HomePlaceholder} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Stats" component={StatsScreen} />
      <Tab.Screen name="Leaderboard" component={LeaderboardScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import type { MainTabParamList } from './types';
import { useTheme } from '@/context/theme';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { HomePlaceholder, Screen } from './Placeholders';
import { ProfileScreen } from '@/features/profile/screens/ProfileScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

const ICONS = { Home: 'home', History: 'time', Stats: 'stats-chart', Leaderboard: 'trophy', Profile: 'person' } as const;

const History = () => <Screen title="History" />;
const Stats = () => <Screen title="Stats" />;
const Leaderboard = () => <Screen title="Leaderboard" />;

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
      <Tab.Screen name="History" component={History} />
      <Tab.Screen name="Stats" component={Stats} />
      <Tab.Screen name="Leaderboard" component={Leaderboard} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
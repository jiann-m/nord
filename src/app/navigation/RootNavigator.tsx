import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from './types';
import { MainTabs } from './MainTabs';
import { useTheme } from '@/context/theme';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { DetailsPlaceholder, Screen } from './Placeholders';
import { SignInScreen } from '@/features/auth/screens/SignInScreen';
import { SignUpScreen } from '@/features/auth/screens/SignUpScreen';
import { ChallengesScreen } from '@/features/challenges/screens/ChallengesScreen';
import { GoalsScreen } from '@/features/goals/screens/GoalsScreen';
import { LiveTrackingScreen } from '@/features/tracking/screens/LiveTrackingScreen';
import { WorkoutSetupScreen } from '@/features/setup/screens/WorkoutSetupScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const WorkoutSummary = () => <Screen title="Workout summary" />;
const Achievements = () => <Screen title="Achievements" />;

// One NavigationContainer at the root (Lab 03).
// Stack: drill deeper and come back. The tabs live inside the "Main" screen.
export function RootNavigator() {
  const { mode, colors } = useTheme();
  const base = mode === 'dark' ? DarkTheme : DefaultTheme;

  // React Navigation's theme with the Nord colours (headers, tab bar, back arrow)
  const navTheme = {
    ...base,
    colors: {
      ...base.colors,
      primary: colors.ink,
      background: colors.page,
      card: colors.page,
      text: colors.ink,
      border: colors.line,
    },
  };

  return (
    <NavigationContainer theme={navTheme}>
      <StatusBar style={mode === 'dark' ? 'light' : 'dark'} />
      <Stack.Navigator initialRouteName="SignIn" screenOptions={{ headerRight: () => <ThemeToggle /> }}>
        <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Create account' }} />
        <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen name="WorkoutSetup" component={WorkoutSetupScreen} options={{ title: 'New workout' }} />
        <Stack.Screen name="LiveTracking" component={LiveTrackingScreen} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="WorkoutSummary" component={WorkoutSummary} options={{ title: 'Summary' }} />
        <Stack.Screen name="WorkoutDetails" component={DetailsPlaceholder} options={{ title: 'Workout' }} />
        <Stack.Screen name="Goals" component={GoalsScreen} />
        <Stack.Screen name="Achievements" component={Achievements} />
        <Stack.Screen name="Challenges" component={ChallengesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
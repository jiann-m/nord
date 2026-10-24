import type { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { WorkoutType } from '@/data/workouts';

// The five tabs: equal areas the user switches between all day
export type MainTabParamList = {
  Home: undefined;
  History: undefined;
  Stats: undefined;
  Leaderboard: undefined;
  Profile: undefined;
};

// The root stack: sign in, the tabs, and every screen you drill into
export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  Main: NavigatorScreenParams<MainTabParamList>;
  WorkoutSetup: undefined;
  LiveTracking: { type: WorkoutType; routeId?: string };
  WorkoutSummary: undefined;
  WorkoutDetails: { workoutId: string };
  Goals: undefined;
  Achievements: undefined;
  Challenges: undefined;
};

// Props for a screen in the root stack
export type RootScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;

// Props for a tab screen: it can open tabs AND root stack screens
export type TabScreenProps<T extends keyof MainTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, T>,
  NativeStackScreenProps<RootStackParamList>
>;
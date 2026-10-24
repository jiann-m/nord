import './global.css';
import { ThemeProvider } from '@/context/theme';
import { ProfileProvider } from '@/context/profile';
import { WorkoutsProvider } from '@/context/workouts';
import { RootNavigator } from '@/app/navigation/RootNavigator';

// The providers wrap the navigator, so every screen can read the shared state (Lab 02)
export default function App() {
  return (
    <ThemeProvider>
      <ProfileProvider>
        <WorkoutsProvider>
          <RootNavigator />
        </WorkoutsProvider>
      </ProfileProvider>
    </ThemeProvider>
  );
}
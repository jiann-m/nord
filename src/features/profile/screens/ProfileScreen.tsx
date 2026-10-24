import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import type { TabScreenProps } from '@/app/navigation/types';
import { AppButton } from '@/components/ui/AppButton';
import { AppInput } from '@/components/ui/AppInput';
import { Card } from '@/components/ui/Card';
import { UnitsPicker } from '../components/UnitsPicker';
import { useProfileViewModel } from '../hooks/useProfileViewModel';

// VIEW: only shows what the view-model gives it.
export function ProfileScreen({ navigation }: TabScreenProps<'Profile'>) {
  const vm = useProfileViewModel();

  // Sign out: clear the history so Back cannot return into the app
  function signOut() {
    navigation.getParent()?.reset({ index: 0, routes: [{ name: 'SignIn' }] });
  }

  return (
    <KeyboardAvoidingView className="flex-1 bg-page" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerClassName="gap-4 p-5 pb-10" keyboardShouldPersistTaps="handled">
        <View className="flex-row items-center gap-4">
          <View className="h-16 w-16 items-center justify-center rounded-full bg-ink">
            <Text className="text-2xl font-bold text-on-ink">{vm.profile.name.charAt(0)}</Text>
          </View>
          <View className="flex-1 gap-1">
            <Text className="text-2xl font-bold text-ink">{vm.profile.name}</Text>
            <Text className="text-muted">{vm.profile.email}</Text>
          </View>
        </View>

        <Card title="Body details">
          <Text className="text-body">Used to estimate the calories of each workout.</Text>
          <AppInput label="Age (years)" keyboardType="number-pad" value={vm.age} onChangeText={vm.changeAge} error={vm.errors.age} />
          <AppInput label="Weight (kg)" keyboardType="decimal-pad" value={vm.weight} onChangeText={vm.changeWeight} error={vm.errors.weight} />
          <AppInput label="Height (cm)" keyboardType="number-pad" value={vm.height} onChangeText={vm.changeHeight} error={vm.errors.height} />
          <Text className="text-muted">BMI {vm.bodyMassIndex}</Text>
          <AppButton label={vm.saved ? 'Saved ✓' : 'Save details'} onPress={vm.save} />
        </Card>

        <Card title="Units">
          <UnitsPicker value={vm.profile.units} onChange={vm.changeUnits} />
        </Card>

        <AppButton label="Sign out" variant="danger" onPress={signOut} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
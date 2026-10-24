import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import type { RootScreenProps } from '@/app/navigation/types';
import { AppButton } from '@/components/ui/AppButton';
import { AppInput } from '@/components/ui/AppInput';
import { useSignUpViewModel } from '../hooks/useSignUpViewModel';

export function SignUpScreen({ navigation }: RootScreenProps<'SignUp'>) {
  // reset: after registering, Back must not return to Sign in / Sign up
  const vm = useSignUpViewModel(() =>
    navigation.reset({ index: 0, routes: [{ name: 'Main', params: { screen: 'Home' } }] }),
  );

  return (
    <KeyboardAvoidingView className="flex-1 bg-black" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerClassName="gap-6 p-6" keyboardShouldPersistTaps="handled">
        <Text className="text-stone-300">Create your Nord account. You can add your weight and height later in Profile.</Text>

        <View className="gap-4">
          <AppInput
            ref={vm.nameRef}
            label="Full name"
            placeholder="Nour Hassan"
            value={vm.name}
            onChangeText={vm.setName}
            error={vm.errors.name}
          />
          <AppInput
            ref={vm.emailRef}
            label="Email"
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={vm.email}
            onChangeText={vm.setEmail}
            error={vm.errors.email}
          />
          <AppInput
            ref={vm.passwordRef}
            label="Password"
            placeholder="At least 8 characters"
            secureTextEntry
            value={vm.password}
            onChangeText={vm.setPassword}
            error={vm.errors.password}
          />
          <AppInput
            ref={vm.confirmRef}
            label="Confirm password"
            secureTextEntry
            value={vm.confirm}
            onChangeText={vm.setConfirm}
            error={vm.errors.confirm}
          />

          <AppButton label={vm.loading ? 'Creating account…' : 'Create account'} onPress={vm.submit} disabled={vm.loading} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
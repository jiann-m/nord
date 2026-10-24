import { Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import type { RootScreenProps } from '@/app/navigation/types';
import { AppButton } from '@/components/ui/AppButton';
import { AppInput } from '@/components/ui/AppInput';
import { ScreenTitle } from '@/components/ui/ScreenTitle';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useTheme } from '@/context/theme';
import { useSignInViewModel } from '../hooks/useSignInViewModel';

// VIEW: only shows what the view-model gives it.
export function SignInScreen({ navigation }: RootScreenProps<'SignIn'>) {
  // replace: Back must not return to the sign-in screen
  const vm = useSignInViewModel(() => navigation.replace('Main', { screen: 'Home' }));
  const { mode } = useTheme();

  return (
    <KeyboardAvoidingView className="flex-1 bg-page" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerClassName="flex-grow justify-center gap-8 p-6" keyboardShouldPersistTaps="handled">
        <View className="flex-row justify-end">
          <ThemeToggle />
        </View>
        <Image
          source={mode === 'dark' ? require('../../../../assets/nord-logo.png') : require('../../../../assets/nord-logo-black.png')}
          style={{ width: 160, height: 172 }}
          className="self-center"
          resizeMode="contain"
          accessibilityLabel="Nord"
        />
        <ScreenTitle eyebrow="Sign in" title="Welcome back" />

        <View className="gap-4">
          <AppInput
            ref={vm.emailRef}
            label="Email"
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={vm.email}
            onChangeText={vm.setEmail}
            error={vm.emailError}
          />
          <AppInput
            ref={vm.passwordRef}
            label="Password"
            placeholder="At least 8 characters"
            secureTextEntry={!vm.visible}
            value={vm.password}
            onChangeText={vm.setPassword}
            error={vm.passwordError}
          />
          <Pressable onPress={() => vm.setVisible(!vm.visible)} accessibilityRole="button" className="self-start active:opacity-70">
            <Text className="font-bold text-ink">{vm.visible ? 'Hide' : 'Show'} password</Text>
          </Pressable>

          <AppButton label={vm.loading ? 'Signing in…' : 'Sign in'} onPress={vm.submit} disabled={vm.loading} />
        </View>

        <View className="flex-row justify-center gap-1">
          <Text className="text-muted">New to Nord?</Text>
          <Pressable onPress={() => navigation.navigate('SignUp')} accessibilityRole="link" className="active:opacity-70">
            <Text className="font-bold text-ink">Create an account</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
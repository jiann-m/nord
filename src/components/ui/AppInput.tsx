import type { Ref } from 'react';
import { View, Text, TextInput, type TextInputInstance, type TextInputProps } from 'react-native';
import { useTheme } from '@/context/theme';

type Props = TextInputProps & {
  label: string;
  error?: string;
  ref?: Ref<TextInputInstance>;
};

// One labelled input used by every form in the app.
// ...rest passes value, onChangeText, placeholder, secureTextEntry etc. to the TextInput.
export function AppInput({ label, error, ref, ...rest }: Props) {
  const { colors } = useTheme();

  return (
    <View className="gap-2">
      <Text className="text-sm font-bold text-body">{label}</Text>
      <TextInput
        ref={ref}
        placeholderTextColor={colors.muted}
        accessibilityLabel={label}
        className={`rounded-xl border bg-card px-4 py-3 text-ink ${error ? 'border-danger' : 'border-line'}`}
        {...rest}
      />
      {error ? <Text className="text-sm text-danger">{error}</Text> : null}
    </View>
  );
}
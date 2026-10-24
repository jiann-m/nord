import { Pressable, Text } from 'react-native';

type Props = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'ghost' | 'danger';
};

// A shared UI primitive: it owns the look, the feedback and the accessibility.
export function AppButton({ label, onPress, disabled = false, variant = 'primary' }: Props) {
  const box = variant === 'primary' ? 'bg-ink' : variant === 'danger' ? 'bg-rose-500/20' : 'border border-line';
  const text = variant === 'primary' ? 'text-on-ink' : variant === 'danger' ? 'text-danger' : 'text-ink';

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      className={`rounded-xl px-5 py-3 active:opacity-70 ${box} ${disabled ? 'opacity-40' : ''}`}
    >
      <Text className={`text-center font-bold ${text}`}>{label}</Text>
    </Pressable>
  );
}
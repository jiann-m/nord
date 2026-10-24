import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/theme';

type Props = {
  label: string;
  value: string;
  hint: string;
  onMinus: () => void;
  onPlus: () => void;
  minusDisabled: boolean;
  plusDisabled: boolean;
};

// − value + ; a button is greyed out at the end of the range
export function Stepper({ label, value, hint, onMinus, onPlus, minusDisabled, plusDisabled }: Props) {
  const { colors } = useTheme();

  return (
    <View className="gap-2">
      <View className="flex-row items-center gap-3">
        <Pressable
          onPress={onMinus}
          disabled={minusDisabled}
          accessibilityRole="button"
          accessibilityLabel={`Decrease ${label}`}
          accessibilityState={{ disabled: minusDisabled }}
          className={`h-12 w-12 items-center justify-center rounded-full border border-line active:opacity-70 ${minusDisabled ? 'opacity-40' : ''}`}
        >
          <Ionicons name="remove" size={24} color={colors.ink} />
        </Pressable>
        <Text className="flex-1 text-center text-3xl font-bold text-ink" accessibilityLabel={`${label}: ${value}`}>
          {value}
        </Text>
        <Pressable
          onPress={onPlus}
          disabled={plusDisabled}
          accessibilityRole="button"
          accessibilityLabel={`Increase ${label}`}
          accessibilityState={{ disabled: plusDisabled }}
          className={`h-12 w-12 items-center justify-center rounded-full border border-line active:opacity-70 ${plusDisabled ? 'opacity-40' : ''}`}
        >
          <Ionicons name="add" size={24} color={colors.ink} />
        </Pressable>
      </View>
      <Text className="text-center text-sm text-muted">{hint}</Text>
    </View>
  );
}
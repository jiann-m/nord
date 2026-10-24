import { ScrollView } from 'react-native';
import { AppButton } from '@/components/ui/AppButton';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Stepper } from '../components/Stepper';
import { useGoalsViewModel } from '../hooks/useGoalsViewModel';

// VIEW: only shows what the view-model gives it.
export function GoalsScreen() {
  const vm = useGoalsViewModel();

  return (
    <ScrollView className="flex-1 bg-page" contentContainerClassName="gap-4 p-5 pb-10">
      <Card title="Daily steps">
        <Stepper
          label="daily steps"
          value={vm.dailySteps.toLocaleString()}
          hint="2,000 to 30,000 · changes by 500"
          onMinus={() => vm.changeSteps(-1)}
          onPlus={() => vm.changeSteps(1)}
          minusDisabled={vm.stepsAtMin}
          plusDisabled={vm.stepsAtMax}
        />
      </Card>

      <Card title="Weekly distance">
        <Stepper
          label="weekly distance"
          value={`${vm.weeklyKm} km`}
          hint="5 to 200 km · changes by 5"
          onMinus={() => vm.changeKm(-1)}
          onPlus={() => vm.changeKm(1)}
          minusDisabled={vm.kmAtMin}
          plusDisabled={vm.kmAtMax}
        />
      </Card>

      <Card title="Your progress">
        <ProgressBar label="Steps today" value={vm.stepsProgress} caption={vm.stepsCaption} />
        <ProgressBar label="Distance this week" value={vm.distanceProgress} caption={vm.distanceCaption} />
      </Card>

      <AppButton label={vm.saved ? 'Saved ✓' : 'Save goals'} onPress={vm.save} disabled={!vm.canSave} />
    </ScrollView>
  );
}
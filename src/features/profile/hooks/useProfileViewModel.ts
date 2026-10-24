import { useState } from 'react';
import { useProfile } from '@/context/profile';
import type { Units } from '@/data/profile';
import { bmi, validateNumber } from '../api';

// VIEW-MODEL: the body-details form, its checks, the units choice and the save action.
export function useProfileViewModel() {
  const { profile, updateProfile } = useProfile();
  const [age, setAge] = useState(String(profile.ageYears));
  const [weight, setWeight] = useState(String(profile.weightKg));
  const [height, setHeight] = useState(String(profile.heightCm));
  const [errors, setErrors] = useState({ age: '', weight: '', height: '' });
  const [saved, setSaved] = useState(false);

  // Typing again hides "Saved ✓" (the form has unsaved changes)
  function changeAge(text: string) {
    setAge(text);
    setSaved(false);
  }
  function changeWeight(text: string) {
    setWeight(text);
    setSaved(false);
  }
  function changeHeight(text: string) {
    setHeight(text);
    setSaved(false);
  }

  function save() {
    const next = {
      age: validateNumber(age, 'Age', 13, 100),
      weight: validateNumber(weight, 'Weight', 30, 250),
      height: validateNumber(height, 'Height', 100, 230),
    };
    setErrors(next);
    if (next.age || next.weight || next.height) return;

    updateProfile({ ageYears: Number(age), weightKg: Number(weight), heightCm: Number(height) });
    setSaved(true);
  }

  function changeUnits(units: Units) {
    updateProfile({ units });
  }

  // Shown under the form, from the saved values
  const bodyMassIndex = bmi(profile.weightKg, profile.heightCm).toFixed(1);

  return {
    profile, age, weight, height, errors, saved, bodyMassIndex,
    changeAge, changeWeight, changeHeight, save, changeUnits,
  };
}
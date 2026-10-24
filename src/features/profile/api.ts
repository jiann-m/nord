// MODEL for the profile: the rules for the body details.
// Phase 2 saves the profile to AsyncStorage / Firestore from here.

// Checks one number field, e.g. validateNumber('70', 'Weight', 30, 250)
export function validateNumber(text: string, label: string, min: number, max: number) {
  const value = Number(text);
  if (!text.trim() || Number.isNaN(value)) return `Enter your ${label.toLowerCase()}`;
  if (value < min || value > max) return `${label} must be between ${min} and ${max}`;
  return '';
}

// Body mass index = weight (kg) / height (m)²
export function bmi(weightKg: number, heightCm: number) {
  const heightM = heightCm / 100;
  return weightKg / (heightM * heightM);
}
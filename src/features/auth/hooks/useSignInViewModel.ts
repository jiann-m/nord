import { useRef, useState } from 'react';
import type { TextInputInstance } from 'react-native';
import { signIn, validateEmail, validatePassword } from '../api';

// VIEW-MODEL: the form state, validation and the sign-in action.
export function useSignInViewModel(onSuccess: () => void) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const emailRef = useRef<TextInputInstance>(null);
  const passwordRef = useRef<TextInputInstance>(null);

  async function submit() {
    const emailMessage = validateEmail(email);
    const passwordMessage = validatePassword(password);
    setEmailError(emailMessage);
    setPasswordError(passwordMessage);

    // Focus the first field that has an error (Lab 02: useRef + focus)
    if (emailMessage) {
      emailRef.current?.focus();
      return;
    }
    if (passwordMessage) {
      passwordRef.current?.focus();
      return;
    }

    setLoading(true);
    try {
      await signIn(email, password);
      onSuccess();
    } catch {
      setPasswordError('Could not sign in. Try again.');
    } finally {
      setLoading(false);
    }
  }

  return {
    email, setEmail, password, setPassword, visible, setVisible,
    emailError, passwordError, loading, emailRef, passwordRef, submit,
  };
}
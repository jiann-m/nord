import { useRef, useState } from 'react';
import type { TextInputInstance } from 'react-native';
import { useProfile } from '@/context/profile';
import { signUp, validateEmail, validatePassword } from '../api';

// VIEW-MODEL: the register form, its checks and the sign-up action.
export function useSignUpViewModel(onSuccess: () => void) {
  const { updateProfile } = useProfile();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errors, setErrors] = useState({ name: '', email: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const nameRef = useRef<TextInputInstance>(null);
  const emailRef = useRef<TextInputInstance>(null);
  const passwordRef = useRef<TextInputInstance>(null);
  const confirmRef = useRef<TextInputInstance>(null);

  async function submit() {
    const next = {
      name: name.trim().length < 2 ? 'Enter your full name' : '',
      email: validateEmail(email),
      password: validatePassword(password),
      confirm: confirm !== password ? 'Passwords do not match' : '',
    };
    setErrors(next);

    if (next.name) return nameRef.current?.focus();
    if (next.email) return emailRef.current?.focus();
    if (next.password) return passwordRef.current?.focus();
    if (next.confirm) return confirmRef.current?.focus();

    setLoading(true);
    try {
      const user = await signUp(name, email, password);
      updateProfile({ name: user.name, email: user.email });
      onSuccess();
    } catch {
      setErrors({ ...next, email: 'Could not create the account. Try again.' });
    } finally {
      setLoading(false);
    }
  }

  return {
    name, setName, email, setEmail, password, setPassword, confirm, setConfirm,
    errors, loading, nameRef, emailRef, passwordRef, confirmRef, submit,
  };
}
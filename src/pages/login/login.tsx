import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch } from '../../services/store';
import { login } from '../../services/slices/user';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const localStorageEmail = localStorage.getItem('email') ?? '';
  const [email, setEmail] = useState(localStorageEmail);
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    localStorage.setItem('email', email);
    dispatch(
      login({
        email: email,
        password: password
      })
    );
  };

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};

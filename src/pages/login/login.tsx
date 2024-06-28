import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'src/services/store';
import {
  clearErrors,
  loginUserThunk,
  selectLoginError
} from '../../Slices/userSlice';

export const Login: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginErrorText = useSelector(selectLoginError);

  useEffect(() => {
    dispatch(clearErrors());
  }, []);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password
    };
    dispatch(loginUserThunk(userData));
  };

  return (
    <LoginUI
      errorText={loginErrorText}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};

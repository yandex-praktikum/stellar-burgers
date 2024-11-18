import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useAppDispatch, useAppSelector } from '@store';
import { loginUser } from '@slices';
import { useNavigate } from 'react-router-dom';

export const Login: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const errorText = useAppSelector((state) => state.userState.error) || '';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    // Пытаюсь авторизовать
    const loggedInUser = await dispatch(loginUser({ email, password }));
    // Если авторизация прошла успешно
    if (loggedInUser.meta.requestStatus === 'fulfilled') {
      navigate('/'); // Перенаправляю на главную
    }
  };

  return (
    <LoginUI
      errorText={errorText}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};

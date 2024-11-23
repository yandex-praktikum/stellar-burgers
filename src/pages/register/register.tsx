import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useAppDispatch, useAppSelector } from '@store';
import { loginUser, registerUser, selectUserError } from '@slices';
import { useNavigate } from 'react-router-dom';

export const Register: FC = () => {
  const navigate = useNavigate();
  const errorText = useAppSelector(selectUserError) || '';

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const registerData = {
      name: userName,
      email: email,
      password: password
    };
    // Пытаюсь зарегистрировать пользователя
    const registeredUser = await dispatch(registerUser(registerData));
    // Если регистрация прошла успешно
    if (registeredUser.meta.requestStatus === 'fulfilled') {
      // Пытаюсь авторизовать
      const loggedInUser = await dispatch(loginUser({ email, password }));
      // Если авторизация прошла успешно
      if (loggedInUser.meta.requestStatus === 'fulfilled') {
        navigate('/'); // Перенаправляю на главную
      }
    }
  };

  return (
    <RegisterUI
      errorText={errorText}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};

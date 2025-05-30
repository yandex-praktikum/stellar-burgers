import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch } from '../../services/store';
import { TLoginData } from '../../utils/burger-api';
import {
  logInUser,
  selectIsAuthenticated
} from '../../services/slices/UserInfoSlice';
import { useSelector } from '../../services/store';
import { Navigate } from 'react-router-dom';

//компонент страницы с формой авторизации
export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const isAuthenticated = useSelector(selectIsAuthenticated);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const userLoginData: TLoginData = {
      email: email,
      password: password
    };
    dispatch(logInUser(userLoginData));
  };

  if (isAuthenticated) {
    return <Navigate to={'/'} />;
  }

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

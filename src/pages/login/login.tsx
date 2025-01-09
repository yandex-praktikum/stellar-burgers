import { FC, SyntheticEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { TLoginData } from '@api';
import { LoginUI } from '@ui-pages';
import { useAppDispatch } from '@store';
import { loginUserThunk } from '@slices';
import { getConstructorItems, getUser } from '@selectors';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const loginData: TLoginData = {
      email: email,
      password: password
    };

    dispatch(loginUserThunk(loginData));
  };

  const user = useSelector(getUser);
  const constructorItems = useSelector(getConstructorItems);

  if (user !== null && constructorItems.bun !== null) {
    return <Navigate to={'/'} />;
  }

  if (user !== null) {
    return <Navigate to={'/profile'} />;
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

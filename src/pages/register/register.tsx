import { FC, SyntheticEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { TRegisterData } from '@api';
import { getUser } from '@selectors';
import { RegisterUI } from '@ui-pages';
import { useAppDispatch } from '@store';
import { registerUserApiThunk } from '@slices';

export const Register: FC = () => {
  const dispatch = useAppDispatch();

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const registerData: TRegisterData = {
      email: email,
      name: userName,
      password: password
    };

    dispatch(registerUserApiThunk(registerData));

    console.log(`${userName} ${email} ${password}`);
  };

  const user = useSelector(getUser);

  if (user !== null) {
    return <Navigate to={'/profile'} />;
  }

  return (
    <RegisterUI
      errorText=''
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

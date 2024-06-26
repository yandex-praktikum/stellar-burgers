import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { TRegisterData } from '@api';
import {
  loginUserThunk,
  registerUserThunk,
  selectUserAuthenticated
} from '../../Slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../services/store';
import { Navigate, useNavigate } from 'react-router-dom';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userAuthenticated = useSelector(selectUserAuthenticated);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const userData: TRegisterData = {
      email: email,
      name: userName,
      password: password
    };
    dispatch(registerUserThunk(userData)).then(() => {
      dispatch(loginUserThunk(userData));
      navigate('/');
    });
  };

  if (userAuthenticated) {
    return <Navigate to={'/'} />;
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

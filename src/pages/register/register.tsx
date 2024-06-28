import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { TRegisterData } from '@api';
import {
  clearErrors,
  loginUserThunk,
  registerUserThunk,
  selectRegisterError,
  selectUserAuthenticated,
  selectUserData
} from '../../Slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../services/store';
import { Navigate, useNavigate } from 'react-router-dom';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(clearErrors());
  }, []);

  const userAuthenticated = useSelector(selectUserAuthenticated);
  const registerErrorText = useSelector(selectRegisterError);
  const data = useSelector(selectUserData);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const userData: TRegisterData = {
      email: email,
      name: userName,
      password: password
    };
    dispatch(registerUserThunk(userData)).then(() => {
      dispatch(loginUserThunk(userData));
      return <Navigate to={'/'} />;
    });
  };

  return (
    <RegisterUI
      errorText={registerErrorText}
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

import { FC, SyntheticEvent, useState, useEffect, useRef } from 'react';
import { RegisterUI } from '@ui-pages';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  registerUser,
  clearError,
  selectAuth
} from '../../services/slices/AuthSlice';
import { useAppDispatch, useAppSelector } from '../../services/store';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { error, registerRequest, isAuthenticated } =
    useAppSelector(selectAuth);
  const fromRef = useRef(location.state?.from?.pathname || '/');

  useEffect(
    () => () => {
      dispatch(clearError());
      return undefined;
    },
    [dispatch]
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate(fromRef.current, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!userName || !email || !password) {
      return;
    }

    dispatch(
      registerUser({
        name: userName,
        email,
        password
      })
    );
  };

  return (
    <RegisterUI
      errorText={error || ''}
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

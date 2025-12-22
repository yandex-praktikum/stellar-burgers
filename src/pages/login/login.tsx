import { FC, SyntheticEvent, useState, useEffect, useRef } from 'react';
import { LoginUI } from '@ui-pages';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  loginUser,
  clearError,
  selectAuth
} from '../../services/slices/AuthSlice';
import { useAppDispatch, useAppSelector } from '../../services/store';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { error, isAuthenticated } = useAppSelector(selectAuth);

  const fromRef = useRef(location.state?.from?.pathname || '/');

  useEffect(() => {
    if (isAuthenticated) {
      navigate(fromRef.current, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(
    () => () => {
      dispatch(clearError());
      return undefined;
    },
    [dispatch]
  );

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    dispatch(loginUser({ email, password }));
  };

  return (
    <LoginUI
      errorText={error || ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};

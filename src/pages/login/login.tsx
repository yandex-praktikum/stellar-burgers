import { FC, SyntheticEvent, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import {
  clearErrors,
  errorSelector,
  loginUserThunk
} from '../../services/slices/userSlice';
import { useDispatch, useSelector } from '../../services/store';
import { LoginUI } from '@ui-pages';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const error = useSelector(errorSelector);
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { from } = location.state || { from: { pathname: '/' } };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUserThunk({ email, password }));
    navigate(from.pathname, { replace: true });
  };

  useEffect(() => {
    dispatch(clearErrors());
  }, []);

  return (
    <LoginUI
      errorText={error!}
      email={email}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};

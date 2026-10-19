import { useDispatch, useSelector } from '@/services/store';
import { LoginUI } from '@ui-pages';
import { type SyntheticEvent, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { loginUser } from '../../services/slices/userSlice';

export const Login = (): React.JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { error } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();

    if (!email || !password) return;

    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        const from = location.state?.from?.pathname || '/';
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.error('Ошибка входа:', err);
      });
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

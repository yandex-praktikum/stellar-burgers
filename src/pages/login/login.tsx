import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { Preloader } from '@ui';
import { useSelector } from '../../services/store';
import { selectError, selectUserProgressCheck } from '@selectors';
import { fetchLoginUser } from '../../services/slices/userSlice';
import { useDispatch } from '../../services/store';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isUserChecking = useSelector(selectUserProgressCheck);
  const dispatch = useDispatch();
  const error = useSelector(selectError) || '';

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(fetchLoginUser({ email, password }));
  };

  if (isUserChecking) {
    return <Preloader />;
  }

  return (
    <LoginUI
      errorText={error}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};

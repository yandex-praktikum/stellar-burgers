import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useSelector } from '../../services/store';
import { fetchRegisterUser } from '../../services/slices/userSlice';
import { selectError, selectUserProgressCheck } from '@selectors';
import { Preloader } from '@ui';
import { useDispatch } from '../../services/store';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const isUserChecking = useSelector(selectUserProgressCheck);
  const error = useSelector(selectError) || '';

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(fetchRegisterUser({ email, name: userName, password }));
  };

  if (isUserChecking) {
    return <Preloader />;
  }

  return (
    <RegisterUI
      errorText={error}
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

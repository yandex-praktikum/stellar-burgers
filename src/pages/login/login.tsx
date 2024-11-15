import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { getUserData, loginUser } from '../../components/slices/userAuthSlice';
import { Preloader } from '@ui';
import { useSelector, useDispatch } from '../../services/store';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(getUserData);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
    const errorText = error || '';
  };

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <LoginUI
          errorText=''
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleSubmit={handleSubmit}
        />
      )}
      ;
    </>
  );
};

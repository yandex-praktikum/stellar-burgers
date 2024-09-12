import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import {
  selectProfileUser,
  profileLogin
} from '../../services/slices/profileUserSlice';
import { Preloader } from '@ui';
export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { isLoading } = useSelector(selectProfileUser);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(profileLogin({ email, password }));
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

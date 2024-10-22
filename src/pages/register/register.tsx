import { FC, SyntheticEvent, useState } from 'react';
import { Preloader } from '@ui';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import {
  selectProfileUser,
  userRegister
} from '../../services/slices/profileUserSlice';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { error, isLoading } = useSelector(selectProfileUser);
  const errorText = error || '';

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(userRegister({ email: email, name: userName, password }));
  };

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <RegisterUI
          errorText={errorText}
          email={email}
          userName={userName}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
          setUserName={setUserName}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
};

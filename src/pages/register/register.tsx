import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, userRegister } from '../../services/slices/userSlice';
import { AppDispatch } from '../../services/store';
import { Preloader } from '@ui';

export const Register: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { error, isLoading } = useSelector(selectUser);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(userRegister({ email, name: userName, password }));
  };

  const errorText = error || '';

  return (
    <>
      {/* {isLoading ? (
        <Preloader />
      ) : ( */}
      <RegisterUI
        errorText=''
        email={email}
        userName={userName}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        setUserName={setUserName}
        handleSubmit={handleSubmit}
      />
      {/* )} */}
    </>
  );
};

import { FC, SyntheticEvent, useState } from 'react';
import { Preloader } from '@ui';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { selectUser, userRegister } from '../../services/slices/profileSlice';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { error, isLoading } = useSelector(selectUser);
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

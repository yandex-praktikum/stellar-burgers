import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { selectUser, userLogin } from '../../services/slices/userSlice';
import { Preloader } from '@ui';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { error, isLoading } = useSelector(selectUser);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(userLogin({ email, password }));
    const errorText = error || '';
  };

  return (
    <>
      {/* {isLoading ? (
        <Preloader />
      ) : ( */}
      <LoginUI
        errorText=''
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
      />
      {/* ) */}
      {/* } */};
    </>
  );
};

import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch } from '../../../src/services/store';
import { fetchUserLogin } from '../../../src/services/slices/userSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.userReducer);
  const navigate = useNavigate();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      fetchUserLogin({
        email: email,
        password: password
      })
    );
    console.log('user: ', JSON.stringify(user));
  };

  useEffect(() => {
    console.log('user: ', JSON.stringify(user));
    if (user.name && user.email && !user.isLoading) navigate('/');
  }, [user]);

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};

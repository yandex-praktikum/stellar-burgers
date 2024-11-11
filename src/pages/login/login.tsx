import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { loginUser } from '../../services/slices/userSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/services/store';
import { useNavigate } from 'react-router-dom';

////////Работает??

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await dispatch(loginUser({ email, password }));
    navigate('/profile');
  };

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

// const loginUser = () => {
//   dispatch(loginUser(loginData))
// };

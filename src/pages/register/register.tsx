import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch } from 'react-redux';
import { register } from '../../components/userSlice';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from 'src/services/store';

export const Register: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      const resultAction = await dispatch(
        register({ name: userName, email, password })
      );

      if (register.fulfilled.match(resultAction)) {
        navigate('/profile');
      } else {
        setErrorText(resultAction.error.message || 'Registration failed');
      }
    } catch (error) {
      setErrorText('Registration failed');
    }
  };

  return (
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
  );
};

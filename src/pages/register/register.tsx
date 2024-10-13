import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch } from 'react-redux';
import { register } from '../../components/userSlice';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { AppDispatch } from 'src/services/store';

export const Register: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate(); // Initialize useNavigate
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState(''); // State for error handling

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      // Dispatch the register action and await its completion
      const resultAction = await dispatch(
        register({ name: userName, email, password })
      );

      // If registration was successful, redirect to the profile page
      if (register.fulfilled.match(resultAction)) {
        navigate('/profile'); // Redirect to profile page
      } else {
        // Handle registration error
        setErrorText(resultAction.error.message || 'Registration failed');
      }
    } catch (error) {
      setErrorText('Registration failed');
    }
  };

  return (
    <RegisterUI
      errorText={errorText} // Pass the error text to UI
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

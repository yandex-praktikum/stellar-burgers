import { FC, SyntheticEvent, useState, useEffect } from 'react';
import { RegisterUI } from '@ui-pages';
import { useSelector, useDispatch } from '../../services/store';
import {
  clearErrors,
  errorSelector,
  registerUserThunk
} from '../../services/slices/userSlice';

export const Register: FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const error = useSelector(errorSelector);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      registerUserThunk({
        name,
        email,
        password
      })
    );
  };

  useEffect(() => {
    dispatch(clearErrors());
  }, [dispatch]);

  return (
    <RegisterUI
      errorText={error!}
      email={email}
      userName={name}
      password={password}
      setUserName={setName}
      setEmail={setEmail}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};

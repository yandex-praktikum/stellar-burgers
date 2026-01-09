import { Preloader } from '@ui';
import { RegisterUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect } from 'react';
import { useForm } from '../../hooks/useForm';
import { useAppDispatch, useAppSelector } from '../../services/store';
import {
  fetchRegisterUser,
  getUserThunk,
  removeErrorText,
  selectErrorText,
  selectLoading
} from '../../slices/stellarBurgerSlice';
import { setCookie } from '../../utils/cookie';

export const Register: FC = () => {
  const dispatch = useAppDispatch();
  const { values, handleChange } = useForm({
    userName: '',
    email: '',
    password: ''
  });
  const isLoading = useAppSelector(selectLoading);
  const error = useAppSelector(selectErrorText);

  useEffect(() => {
    dispatch(removeErrorText());
  }, []);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      fetchRegisterUser({
        name: values.userName,
        password: values.password,
        email: values.email
      })
    )
      .unwrap()
      .then((payload) => {
        localStorage.setItem('refreshToken', payload.refreshToken);
        setCookie('accessToken', payload.accessToken);
        dispatch(getUserThunk());
      });
  };

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <RegisterUI
      errorText={error}
      email={values.email}
      userName={values.userName}
      password={values.password}
      setEmail={handleChange}
      setPassword={handleChange}
      setUserName={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

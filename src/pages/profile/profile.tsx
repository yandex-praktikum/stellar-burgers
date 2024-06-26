import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectUserAuthenticated,
  selectUserData,
  updateUserDataThunk
} from '../../Slices/userSlice';
import { TUser } from '@utils-types';
import { AppDispatch } from 'src/services/store';
import { Navigate } from 'react-router-dom';

export const Profile: FC = () => {
  const userData = useSelector(selectUserData) as TUser;
  const dispatch = useDispatch<AppDispatch>();

  /** TODO: взять переменную из стора */
  const user = {
    name: userData?.name,
    email: userData?.email
  };

  const [formValue, setFormValue] = useState({
    name: user.name,
    email: user.email,
    password: ''
  });

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [userData]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(updateUserDataThunk(formValue));
  };

  const userAuthenticated = useSelector(selectUserAuthenticated);
  if (!userAuthenticated) {
    return <Navigate to={'/login'} />;
  }

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user.name,
      email: user.email,
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};

import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { Navigate } from 'react-router-dom';
import { updateUserThunk } from '../../services/userSlice/thunk';

export const Profile: FC = () => {
  const userData = useSelector((store) => store.user.user);
  const dispatch = useDispatch();

  if (!userData) {
    return <Navigate to='/' />;
  }

  const [formValue, setFormValue] = useState({
    name: userData.name,
    email: userData.email,
    password: ''
  });

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: userData.name,
      email: userData.email
    }));
  }, [userData]);

  const isFormChanged =
    formValue.name !== userData.name ||
    formValue.email !== userData.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(updateUserThunk(formValue));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: userData.name,
      email: userData.email,
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

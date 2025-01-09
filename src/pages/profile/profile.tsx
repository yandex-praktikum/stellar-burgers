import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Preloader } from '@ui';
import { getUser } from '@selectors';
import { ProfileUI } from '@ui-pages';
import { useAppDispatch } from '@store';
import { getUserApiThunk, updateUserApiThank } from '@slices';

export const Profile: FC = () => {
  const user = useSelector(getUser);

  const dispatch = useAppDispatch();

  const [formValue, setFormValue] = useState({
    name: user?.name ?? '',
    email: user?.email ?? '',
    password: ''
  });

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name ?? '',
      email: user?.email ?? ''
    }));
  }, [user]);

  useEffect(() => {
    if (user !== null) {
      return;
    }
    dispatch(getUserApiThunk());
  }, []);

  if (user === null) {
    return <Preloader />;
  }

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(updateUserApiThank(formValue)).then(() => {
      setFormValue({
        ...formValue,
        password: ''
      });
    });
  };

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

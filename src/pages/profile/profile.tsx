import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@app-store';
import { getEmail, getName, updateUser } from '@slices';

export const Profile: FC = () => {
  const dispatc = useAppDispatch();
  const userName = useAppSelector(getName);
  const userEmail = useAppSelector(getEmail);
  const user = {
    name: '',
    email: ''
  };

  const [formValue, setFormValue] = useState({
    name: user.name,
    email: user.email,
    password: ''
  });

  useEffect(() => {
    setFormValue(() => ({
      name: userName,
      email: userEmail,
      password: ''
    }));
  }, [userName, userEmail]);

  const isFormChanged =
    formValue.name !== userName ||
    formValue.email !== userEmail ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatc(updateUser(formValue));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: userName,
      email: userEmail,
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

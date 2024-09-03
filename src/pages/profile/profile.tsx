import { useSelector, useDispatch } from '../../services/store';
import { useEffect, useState, SyntheticEvent, FC } from 'react';
import {
  fetchUserProfile,
  updateUserProfile,
  selectUser,
  selectIsLoading,
  selectIsUpdating
} from '../../services/slices/profileSlice';
import { ProfileUI } from '@ui-pages';

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser); // Используем селектор selectUser
  const isLoading = useSelector(selectIsLoading); // Используем селектор selectIsLoading
  const isUpdating = useSelector(selectIsUpdating); // Используем селектор selectIsUpdating
  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    dispatch(fetchUserProfile()); // Загружаем профиль при монтировании компонента
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFormValue({ name: user.name, email: user.email, password: '' });
    }
  }, [user]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      updateUserProfile({
        name: formValue.name,
        email: formValue.email,
        password: formValue.password
      })
    );
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user?.name || '',
      email: user?.email || '',
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
      isUpdating={isUpdating}
    />
  );
};

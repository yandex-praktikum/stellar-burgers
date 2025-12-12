import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  updateUser,
  logoutUser,
  getUser,
  clearError,
  selectAuth
} from '../../services/slices/AuthSlice';
import { AppDispatch } from '../../services/store';

export const Profile: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user, error, updateRequest, isAuthenticated } =
    useSelector(selectAuth);

  const [formValue, setFormValue] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  });

  useEffect(() => {
    if (isAuthenticated && !user) {
      dispatch(getUser());
    }
  }, [dispatch, isAuthenticated, user]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (user) {
      setFormValue((prevState) => ({
        ...prevState,
        name: user.name || '',
        email: user.email || ''
      }));
    }
  }, [user]);

  useEffect(
    () => () => {
      dispatch(clearError());
      return undefined;
    },
    [dispatch]
  );

  const isFormChanged =
    formValue.name !== (user?.name || '') ||
    formValue.email !== (user?.email || '') ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!isFormChanged) {
      return;
    }

    const updateData: { name?: string; email?: string; password?: string } = {};

    if (formValue.name !== user?.name) {
      updateData.name = formValue.name;
    }

    if (formValue.email !== user?.email) {
      updateData.email = formValue.email;
    }

    if (formValue.password) {
      updateData.password = formValue.password;
    }

    dispatch(updateUser(updateData)).then((action) => {
      if (updateUser.fulfilled.match(action)) {
        setFormValue((prevState) => ({
          ...prevState,
          password: ''
        }));
      }
    });
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

  const handleLogout = () => {
    console.log('Profile: handleLogout called');
    dispatch(logoutUser())
      .unwrap()
      .then(() => {
        console.log('Logout successful, navigating to login');
        navigate('/login', { replace: true });
      })
      .catch((error) => {
        console.error('Logout error:', error);
        navigate('/login', { replace: true });
      });
  };

  if (!user && isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
      updateUserRequest={updateRequest}
      updateUserError={error || ''}
      onLogout={handleLogout}
    />
  );
};

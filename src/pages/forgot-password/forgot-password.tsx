import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ForgotPasswordUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import {
  forgotPassword,
  resetForgotPasswordState
} from '../../services/slices/slice-auth/slice-auth';

export const ForgotPassword: FC = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const { forgotPasswordSuccess, error } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(forgotPassword({ email }));
  };

  useEffect(() => {
    if (forgotPasswordSuccess) {
      localStorage.setItem('resetPassword', 'true');
      navigate('/reset-password', { replace: true });
      dispatch(resetForgotPasswordState());
    }
  }, [dispatch, forgotPasswordSuccess, navigate]);

  return (
    <ForgotPasswordUI
      errorText={error || ''}
      email={email}
      setEmail={setEmail}
      handleSubmit={handleSubmit}
    />
  );
};

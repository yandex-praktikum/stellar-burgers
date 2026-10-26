import { useDispatch, useSelector } from '@/services/store';
// import { resetPasswordApi } from '@api';
import { ResetPasswordUI } from '@ui-pages';
import { type SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { resetPassword } from '../../services/slices/userSlice';

export const ResetPassword = (): React.JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  // const [error, setError] = useState<Error | null>(null);
  const { error } = useSelector((state) => state.user);

  const handleSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();

    if (!password || !token) return;

    dispatch(resetPassword({ password, token }))
      .unwrap()
      .then(() => {
        localStorage.removeItem('resetPassword');
        navigate('/login', { replace: true });
      })
      .catch((err) => {
        console.error('Не удалось сбросить пароль:', err);
      });

    // setError(null);
    // void resetPasswordApi({ password, token })
    //   .then(() => {
    //     localStorage.removeItem('resetPassword');
    //     void navigate('/login');
    //   })
    //   .catch((err: Error) => setError(err));
  };

  useEffect(() => {
    if (!localStorage.getItem('resetPassword')) {
      void navigate('/forgot-password', { replace: true });
    }
  }, [navigate]);

  return (
    <ResetPasswordUI
      errorText={error || ''}
      password={password}
      token={token}
      setPassword={setPassword}
      setToken={setToken}
      handleSubmit={handleSubmit}
    />
  );
};

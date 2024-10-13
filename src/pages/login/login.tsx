import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../components/userSlice';
import { useNavigate } from 'react-router-dom'; // для навигации
import { getErrorSelector } from '../../components/userSlice';
import { AppDispatch } from 'src/services/store';

export const Login: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate(); // используем useNavigate для перенаправления
  const errorText = useSelector(getErrorSelector); // получаем текст ошибки из Redux
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    // Попробуем выполнить вход
    const resultAction = await dispatch(login({ email, password }));

    // Проверяем, была ли ошибка при входе
    if (login.fulfilled.match(resultAction)) {
      // Если вход успешен, перенаправляем на личный кабинет
      navigate('/profile'); // замените '/profile' на путь к вашему личному кабинету
    }
  };

  return (
    <LoginUI
      errorText={errorText} // передаем текст ошибки в UI
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};

import { FC, useState, SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { forgotPasswordApi } from '@api';
import { ForgotPasswordUI } from '@ui-pages';

//компонент страницы восстановления пароля
export const ForgotPassword: FC = () => {
  const [email, setEmail] = useState(''); // Локальное состояние для хранения email, введенного пользователем
  const [error, setError] = useState<Error | null>(null); // Локальное состояние для хранения ошибок, которые могут возникнуть при отправке формы

  // Хук для навигации между страницами
  const navigate = useNavigate();

  // Обрабатывает событие отправки формы. Предотвращает перезагрузку страницы, отправляет запрос на сервер и обрабатывает успешный результат или ошибку.
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    setError(null); // Сбрасываем предыдущее состояние ошибки, если такое было
    forgotPasswordApi({ email })
      .then(() => {
        localStorage.setItem('resetPassword', 'true'); // Если запрос успешен, сохраняем флаг в localStorage
        navigate('/reset-password', { replace: true }); // Перенаправляем пользователя на страницу сброса пароля
      })
      .catch((err) => setError(err)); //если нет - сохр ошибку в локальное состояние
  };

  // Возвращаем JSX с компонентом пользовательского интерфейса страницы восстановления пароля
  return (
    <ForgotPasswordUI
      errorText={error?.message}
      email={email}
      setEmail={setEmail}
      handleSubmit={handleSubmit}
    />
  );
};

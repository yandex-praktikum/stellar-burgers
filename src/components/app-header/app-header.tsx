import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useNavigate } from 'react-router-dom'; // Импортируем useNavigate
import { useSelector } from 'react-redux'; // Импортируем useSelector
import { isAuthCheckedSelector } from '../userSlice'; // Импортируем селектор для проверки статуса авторизации

export const AppHeader: FC = () => {
  const navigate = useNavigate(); // Используем хук useNavigate
  const isAuthChecked = useSelector(isAuthCheckedSelector); // Получаем статус авторизации

  const handleOrdersClick = () => {
    navigate('/feed'); // Переход на страницу "Лента заказов"
  };

  const handleConstructorClick = () => {
    navigate('/'); // Переход на страницу конструктора
  };

  const handleProfileClick = () => {
    if (!isAuthChecked) {
      navigate('/login'); // Перенаправляем на страницу логина, если пользователь не авторизован
    } else {
      navigate('/profile'); // Переход на страницу профиля, если пользователь авторизован
    }
  };

  return (
    <AppHeaderUI
      userName=''
      onOrdersClick={handleOrdersClick}
      onConstructorClick={handleConstructorClick}
      onProfileClick={handleProfileClick} // Добавляем обработчик для кнопки "Личный кабинет"
    />
  );
};

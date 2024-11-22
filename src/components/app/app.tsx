import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { ProtectedRoute } from '@components';
import { useAppDispatch, useAppSelector } from '@store';
import { useEffect } from 'react';
import { fetchIngredients, fetchUser, getFeed } from '@slices';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { isChecked, user } = useAppSelector((state) => state.userState);

  // Проверяю авторизацию
  useEffect(() => {
    // Проверка токена и загрузка пользователя при старте приложения
    if (!isChecked) {
      dispatch(fetchUser());
    }
  }, [dispatch, isChecked, user]);

  // Достаю из локации информацию о предыдущей странице (если она есть)
  const backgroundLocation = location.state?.background;

  // Функция для закрытия модального окна
  const handleCloseModal = () => {
    navigate(-1); // Возвращение к предыдущему маршруту
  };

  return (
    <div className={styles.app}>
      {/* Шапка приложения */}
      <AppHeader />

      {/* Основные маршруты */}
      <Routes location={backgroundLocation || location}>
        {/* Открытые маршруты */}
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />

        {/* Защищённые маршруты */}
        <Route element={<ProtectedRoute isProtected />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/orders' element={<ProfileOrders />} />
          <Route path='/profile/orders/:number' element={<OrderInfo />} />
        </Route>

        {/* Общедоступные маршруты, доступные только незалогиненным */}
        <Route element={<ProtectedRoute isProtected={false} />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
        </Route>

        {/* 404 Страница */}
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {/* Модальные окна */}
      {backgroundLocation && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={handleCloseModal}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/feed/:number'
            element={
              <Modal title='Информация о заказе' onClose={handleCloseModal}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal title='Информация о заказе' onClose={handleCloseModal}>
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;

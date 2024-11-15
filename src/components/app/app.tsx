import '../../index.css';
import styles from './app.module.css';
import { AppHeader, Modal, OrderInfo, IngredientDetails } from '@components';
import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { ProtectedRoute } from '../protected-royte';
import { checkUserAuth } from '../slices/userAuthSlice';
import { getBurgerIngridients } from '../slices/burgerIngridientsSlice';
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

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state?.background;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(getBurgerIngridients());
  }, []);
  return (
    <>
      <div className={styles.app}>
        {/* Основные маршруты */}
        <AppHeader />
        <Routes location={background || location}>
          <Route path='/' element={<ConstructorPage />} />
          <Route path='feed' element={<Feed />} />
          <Route
            path='login'
            element={
              <ProtectedRoute ifNotAuth>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path='/register'
            element={
              <ProtectedRoute ifNotAuth>
                <Register />
              </ProtectedRoute>
            }
          />
          <Route
            path='/forgot-password'
            element={
              <ProtectedRoute ifNotAuth>
                <ForgotPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path='/reset-password'
            element={
              <ProtectedRoute ifNotAuth>
                <ResetPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile'
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile/orders'
            element={
              <ProtectedRoute>
                <ProfileOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path='/feed/:number'
            element={
              <Modal title='Детали заказа' onClose={() => navigate('/feed')}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={() => navigate('/')}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal
                title='Детали заказа'
                onClose={() => navigate('/profile/orders')}
              >
                <OrderInfo />
              </Modal>
            }
          />
          {/* Маршрут ошибок */}
          <Route path='*' element={<NotFound404 />} />
        </Routes>
        {/* Маршруты модалки с дополнительной информацией */}
        {background && (
          <Routes>
            <Route
              path='/feed/:number'
              element={
                <Modal
                  title='Информация о заказе'
                  onClose={() => {
                    navigate('/feed');
                  }}
                >
                  <OrderInfo />
                </Modal>
              }
            />
            <Route
              path='/ingredients/:id'
              element={
                <Modal
                  title='Детали ингредиента'
                  onClose={() => {
                    navigate('/');
                  }}
                >
                  <IngredientDetails />
                </Modal>
              }
            />
            <Route
              path='/profile/orders/:number'
              element={
                <ProtectedRoute>
                  <Modal
                    title='Информация о заказе'
                    onClose={() => {
                      navigate('/profile/orders');
                    }}
                  >
                    <OrderInfo />
                  </Modal>
                </ProtectedRoute>
              }
            />
          </Routes>
        )}
      </div>
    </>
  );
};

export default App;

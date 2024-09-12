import '../../index.css';
import styles from './app.module.css';
import {
  Feed,
  NotFound404,
  ConstructorPage,
  Login,
  ResetPassword,
  Register,
  ForgotPassword,
  ProfileOrders,
  Profile
} from '@pages';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route/protected-route';
import { useEffect } from 'react';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';
import { AppHeader, Modal, OrderInfo, IngredientDetails } from '@components';
import { useDispatch } from '../../services/store';
import { verifyUser } from '../../services/slices/profileUserSlice';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const backgroundPosition = location.state?.background;

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(verifyUser());
  }, [dispatch]);

  // Функция для создания маршрутов модальных окон
  const renderModalRoute = (
    path: string,
    title: string,
    onClose: () => void,
    children: JSX.Element
  ) => (
    <Route
      path={path}
      element={
        <Modal title={title} onClose={onClose}>
          {children}
        </Modal>
      }
    />
  );

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundPosition || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute anonymous>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute anonymous>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute anonymous>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute anonymous>
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

        {renderModalRoute(
          '/feed/:number',
          'Детали заказа',
          () => navigate('/feed'),
          <OrderInfo />
        )}
        {renderModalRoute(
          '/ingredients/:id',
          'Детали ингредиента',
          () => navigate('/'),
          <IngredientDetails />
        )}
        {renderModalRoute(
          '/profile/orders/:number',
          'Детали заказа',
          () => navigate('/profile/orders'),
          <OrderInfo />
        )}

        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {backgroundPosition && (
        <Routes>
          {renderModalRoute(
            '/feed/:number',
            'Детали заказа',
            () => navigate('/feed'),
            <OrderInfo />
          )}
          {renderModalRoute(
            '/ingredients/:id',
            'Детали ингредиента',
            () => navigate('/'),
            <IngredientDetails />
          )}
          {renderModalRoute(
            '/profile/orders/:number',
            'Детали заказа',
            () => navigate('/profile/orders'),
            <OrderInfo />
          )}
        </Routes>
      )}
    </div>
  );
};

export default App;

import { Route, Routes, useLocation } from 'react-router-dom';
import ProtectedRoute from '../protected-route/protected-route';
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

const closeModal = () => {
  // Логика закрытия модального окна
};

const ModalRoutes = () => {
  const location = useLocation();

  return (
    <Routes location={location}>
      <Route
        path='/feed/:number'
        element={
          <Modal title='Детали заказа' onClose={closeModal}>
            <OrderInfo />
          </Modal>
        }
      />
      <Route
        path='/ingredients/:id'
        element={
          <Modal title='Детали ингридиета' onClose={closeModal}>
            <IngredientDetails />
          </Modal>
        }
      />
      <Route
        path='/profile/orders/:number'
        element={
          <Modal title='Детали заказа' onClose={closeModal}>
            <OrderInfo />
          </Modal>
        }
      />
    </Routes>
  );
};

const App = () => (
  <div className={styles.app}>
    <AppHeader />
    <Routes>
      <Route path='/' element={<ConstructorPage />} />
      <Route path='/feed' element={<Feed />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/reset-password' element={<ResetPassword />} />
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
      <Route path=' ' element={<NotFound404 />} />
    </Routes>
    <ModalRoutes />
  </div>
);

export default App;

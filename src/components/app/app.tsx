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

import { AppHeader, Modal, OrderInfo } from '@components';
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route/protected-route';
import { title } from 'process';
import { useState } from 'react';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');

  const onClose = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setModalTitle(title);
    setIsModalOpen(true);
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute>
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
        <Route path='*' element={<NotFound404 />} />
        <Route
          path='/feed/:number'
          element={
            isModalOpen && (
              <Modal title={title} onClose={onClose}>
                <OrderInfo />
              </Modal>
            )
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            isModalOpen && (
              <Modal title={title} onClose={onClose}>
                <OrderInfo />
              </Modal>
            )
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            isModalOpen && (
              <ProtectedRoute>
                <Modal title={title} onClose={onClose}>
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            )
          }
        />
      </Routes>
    </div>
  );
};

export default App;

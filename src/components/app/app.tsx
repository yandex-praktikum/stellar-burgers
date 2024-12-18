import '../../index.css';
import styles from './app.module.css';
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
import { AppHeader, OrderInfo, IngredientDetails, Modal } from '@components';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route';
import { useDispatch } from '../../services/store';
import { ReactNode } from 'react';
import { JSX } from 'react/jsx-runtime';
import { resetOrderModal, getUser, fetchIngredients } from '@slices';

const App = () => {
  const dispatch = useDispatch();
  dispatch(getUser());
  dispatch(fetchIngredients());

  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state?.background;
  const modalClose = () => {
    navigate(-1);
    dispatch(resetOrderModal());
  };

  const renderModalRoute = (
    path: string | undefined,
    title: string,
    Component:
      | string
      | number
      | boolean
      | JSX.Element
      | Iterable<ReactNode>
      | null
      | undefined
  ) => (
    <Route
      path={path}
      element={
        <Modal title={title} onClose={modalClose}>
          {Component}
        </Modal>
      }
    />
  );

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
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
      </Routes>
      {background && (
        <Routes>
          {renderModalRoute(
            '/ingredients/:id',
            'Детали ингредиента',
            <IngredientDetails />
          )}
          {renderModalRoute('/feed/:number', 'Детали заказа', <OrderInfo />)}
          {renderModalRoute(
            '/profile/orders/:number',
            'Детали заказа',
            <OrderInfo />
          )}
        </Routes>
      )}
    </div>
  );
};

export default App;

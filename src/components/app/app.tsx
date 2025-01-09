import { Provider } from 'react-redux';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import store from '@store';

import { ProtectedRoute } from '../protected-route/protected-route';

import '../../index.css';
import styles from './app.module.css';

const App = () => {
  const location = useLocation();
  const backgroundLocation = location.state?.background;
  const navigate = useNavigate();

  const closeModalHandler = () => {
    console.log('close Modal');
    if (backgroundLocation) {
      navigate(backgroundLocation);
    } else {
      navigate('/'); // Перенаправляем на дефолтный маршрут
    }
  };
  return (
    <div className={styles.app}>
      <Provider store={store}>
        <AppHeader />

        <Routes location={backgroundLocation || location}>
          <Route path='/' element={<ConstructorPage />} />
          <Route path='/feed' element={<Feed />} />
          <Route path='/feed/:number' element={<OrderInfo />} />
          <Route path='/ingredients/:id' element={<IngredientDetails />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/profile'>
            <Route
              index
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path='orders'
              element={
                <ProtectedRoute>
                  <ProfileOrders />
                </ProtectedRoute>
              }
            />
            <Route path='orders/:number' element={<OrderInfo />} />
          </Route>

          <Route path='*' element={<NotFound404 />} />
        </Routes>

        {/* Если есть backgroundLocation, показываем модалку */}
        {backgroundLocation && (
          <Routes>
            <Route
              path='/ingredients/:id'
              element={
                <Modal title={''} onClose={closeModalHandler}>
                  <IngredientDetails />
                </Modal>
              }
            />
            <Route
              path='/profile/orders/:number'
              element={
                <Modal title={''} onClose={closeModalHandler}>
                  <OrderInfo />
                </Modal>
              }
            />

            <Route
              path='/feed/:number'
              element={
                <Modal title={''} onClose={closeModalHandler}>
                  <OrderInfo />
                </Modal>
              }
            />
          </Routes>
        )}
      </Provider>
    </div>
  );
};

export default App;

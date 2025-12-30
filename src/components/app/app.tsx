import { ConstructorPage } from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { useNavigate } from 'react-router-dom';
import { Route, Routes, useLocation } from 'react-router-dom';
import {
  Feed,
  Login,
  NotFound404,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders
} from '@pages';

import { AppHeader } from '@components';
import { Modal } from '@components';
import { OrderInfo } from '@components';
import { IngredientDetails } from '@components';
import { ProtectedRoute } from '@components';
import { useAppDispatch, useAppSelector } from '../../services/store';
import {
  clearViewOrderData,
  fetchIngredients
} from '../../services/slices/BurgerSlice';
import { useEffect } from 'react';
import {
  getUser,
  clearAuth,
  selectIsAuthenticated
} from '../../services/slices/AuthSlice';
import { getCookie } from '../../utils/cookie';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(selectIsAuthenticated);
  const location = useLocation();
  const background = location.state && location.state.background;
  const navigate = useNavigate();

  useEffect(() => {
    const token = getCookie('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (token && refreshToken) {
      dispatch(getUser())
        .unwrap()
        .catch((error) => {
          dispatch(clearAuth());
        });
    } else {
      dispatch(clearAuth());
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  const handleCloseOrderModal = () => {
    dispatch(clearViewOrderData());
    navigate(-1);
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='/feed/:number' element={<OrderInfo />} />

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
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <OrderInfo />
            </ProtectedRoute>
          }
        />

        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {background && (
        <>
          <Routes>
            <Route
              path='/feed/:number'
              element={
                <Modal title='' onClose={handleCloseOrderModal}>
                  <OrderInfo />
                </Modal>
              }
            />

            <Route
              path='/ingredients/:id'
              element={
                <Modal title='Детали ингредиента' onClose={() => navigate(-1)}>
                  <IngredientDetails />
                </Modal>
              }
            />

            <Route
              path='/profile/orders/:number'
              element={
                <ProtectedRoute>
                  <Modal title='' onClose={handleCloseOrderModal}>
                    <OrderInfo />
                  </Modal>
                </ProtectedRoute>
              }
            />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;

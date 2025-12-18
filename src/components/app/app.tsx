import { ConstructorPage } from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { useNavigate } from 'react-router-dom';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
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
export const useAuthCheck = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = getCookie('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (token && refreshToken) {
      dispatch(getUser())
        .unwrap()
        .catch(() => {
          dispatch(clearAuth());
        });
    } else {
      dispatch(clearAuth());
    }
  }, [dispatch, navigate]);
};

function App(): JSX.Element {
  useAuthCheck();
  const isAuth = useAppSelector(selectIsAuthenticated);
  const location = useLocation();
  const background = location.state && location.state.background;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
        <Route path='*' element={<NotFound404 />} />

        <Route
          path='/login'
          element={!isAuth ? <Login /> : <Navigate to='/' replace />}
        />
        <Route
          path='/register'
          element={!isAuth ? <Register /> : <Navigate to='/' replace />}
        />
        <Route
          path='/forgot-password'
          element={!isAuth ? <ForgotPassword /> : <Navigate to='/' replace />}
        />
        <Route
          path='/reset-password'
          element={!isAuth ? <ResetPassword /> : <Navigate to='/' replace />}
        />
        <Route
          path='/profile'
          element={isAuth ? <Profile /> : <Navigate to='/login' replace />}
        />
        <Route
          path='/profile/orders'
          element={
            isAuth ? <ProfileOrders /> : <Navigate to='/login' replace />
          }
        />
        <Route
          path='/profile/orders/:number'
          element={isAuth ? <OrderInfo /> : <Navigate to='/login' replace />}
        />
      </Routes>

      {background && (
        <>
          <Routes>
            <Route
              path='/feed/:number'
              element={
                <Modal
                  title='Информация о заказе'
                  onClose={handleCloseOrderModal}
                >
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
                isAuth ? (
                  <Modal
                    title='Информация о заказе'
                    onClose={handleCloseOrderModal}
                  >
                    <OrderInfo />
                  </Modal>
                ) : (
                  <Navigate to='/login' replace />
                )
              }
            />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;

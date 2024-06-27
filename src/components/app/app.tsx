import { Route, Routes, useNavigate } from 'react-router-dom';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
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
import { ProtectedRouteUnAuth } from '../ProtectedRoutes/ProtectedRouteUnAuth';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/services/store';
import { TIngredient } from '@utils-types';
import {
  fetchIngredients,
  selectIngredients
} from '../../Slices/IngrediensSlice';
import { useEffect } from 'react';
import { checkUserAuth } from '../../Slices/userSlice';
import { ProtectedRouteAuth } from '../ProtectedRoutes/ProtectedRouteAuth';

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(checkUserAuth());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <ProtectedRouteAuth>
              <Login />
            </ProtectedRouteAuth>
          }
        />

        <Route
          path='/register'
          element={
            <ProtectedRouteAuth>
              <Register />
            </ProtectedRouteAuth>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRouteAuth>
              <ForgotPassword />
            </ProtectedRouteAuth>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRouteAuth>
              <ResetPassword />
            </ProtectedRouteAuth>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRouteUnAuth>
              <Profile />
            </ProtectedRouteUnAuth>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRouteUnAuth>
              <ProfileOrders />
            </ProtectedRouteUnAuth>
          }
        />
        <Route path='*' element={<NotFound404 />} />
        <Route
          path='/feed/:number'
          element={
            <Modal title={''} onClose={() => navigate('/feed')}>
              <OrderInfo />
            </Modal>
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <Modal title={'Детали ингредиента'} onClose={() => navigate('/')}>
              <IngredientDetails />
            </Modal>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRouteUnAuth>
              <Modal title={''} onClose={() => navigate('/profile/orders')}>
                <OrderInfo />
              </Modal>
            </ProtectedRouteUnAuth>
          }
        />
      </Routes>
    </div>
  );
};

export default App;

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
import '../../index.css';
import styles from './app.module.css';
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  Routes,
  Outlet,
  useNavigate
} from 'react-router-dom';

import {
  AppHeader,
  IngredientDetails,
  OrderInfo,
  ProtectedRoute
} from '@components';
import { useEffect, useState } from 'react';
import { useDispatch } from '../../../src/services/store';
import { fetchGetUser } from '../../../src/services/slices/userSlice';
import { useSelector } from 'react-redux';
import { fetchIngredients } from '@slices';

export const App = () => {
  const dispatch = useDispatch();
  const [pathname, setPathName] = useState('/');
  const user = useSelector((state: any) => state.userReducer);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchGetUser());
    dispatch(fetchIngredients());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Outlet />
    </div>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route
        index
        element={
          <ProtectedRoute>
            <ConstructorPage />
          </ProtectedRoute>
        }
      />
      <Route path='/feed' element={<Feed />} />
      <Route path='/feed/:number' element={<OrderInfo />} />
      <Route path='/login' element={<Login />} />
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
        path='/reset-password/:tokenId'
        element={
          <ProtectedRoute>
            <ResetPassword />
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
        path='profile/orders/:number'
        element={
          <ProtectedRoute>
            <OrderInfo />
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
      <Route path='/ingredients/:id' element={<IngredientDetails />} />
      <Route path='*' element={<NotFound404 />} />
    </Route>
  )
);

export default router;

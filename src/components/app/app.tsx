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
  useNavigate,
  useLocation
} from 'react-router-dom';

import {
  AppHeader,
  IngredientDetails,
  OrderInfo,
  ProtectedRoute
} from '@components';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../../src/services/store';
import {
  fetchGetUser,
  selectUser
} from '../../../src/services/slices/userSlice';

import { fetchIngredients } from '@slices';

export const App = () => {
  const dispatch = useDispatch();
  const [pathname, setPathName] = useState('/');
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const location = useLocation();

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
      <Route index element={<ConstructorPage />} />
      <Route path='/ingredients/:id' element={<ConstructorPage />} />
      <Route path='/feed' element={<Feed />} />
      <Route path='/feed/:number' element={<Feed />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/reset-password' element={<ResetPassword />} />
      <Route path='/reset-password/:tokenId' element={<ResetPassword />} />
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
            <ProfileOrders />
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
      <Route path='*' element={<NotFound404 />} />
    </Route>
  )
);

export default router;

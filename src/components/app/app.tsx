import {
  ConstructorPage,
  Feed,
  NotFound404,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  ProfileOrders
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import {
  Routes,
  Route,
  useLocation,
  Link,
  useNavigate
} from 'react-router-dom';
import { useEffect } from 'react';
import { ProtectedRoute } from '../protected-route/protected-route';
import { getIngredients } from '../../services/slices/ingredientsSlice';
import { AppHeader, Modal, OrderInfo, IngredientDetails } from '@components';
import { useDispatch } from '../../services/store';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function onClose() {
    navigate(-1);
  }

  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  return (
    <>
      <div className={styles.app}>
        <AppHeader />
        <Routes>
          <Route path='/' element={<ConstructorPage />} />
          <Route path='/feed' element={<Feed />} />
          <Route
            path='login'
            element={
              <ProtectedRoute>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path='register'
            element={
              <ProtectedRoute>
                <Register />
              </ProtectedRoute>
            }
          />
          <Route
            path='forgot-password'
            element={
              <ProtectedRoute>
                <ForgotPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path='reset-password'
            element={
              <ProtectedRoute>
                <ResetPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path='profile/orders'
            element={
              <ProtectedRoute>
                <ProfileOrders />
              </ProtectedRoute>
            }
          />
          <Route path='*' element={<NotFound404 />} />
        </Routes>
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title='Детали заказа' onClose={onClose}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route path='/ingredients/:id' element={<IngredientDetails />} />
          <Route path='/profile/orders/:number' element={<OrderInfo />} />
        </Routes>
      </div>
    </>
  );
};

export default App;

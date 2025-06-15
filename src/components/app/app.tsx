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
import { Routes, Route, useNavigate, useMatch } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { useEffect } from 'react';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';
import { ProtectedRoute } from '../protectedRoute/protectedRoute';
import { fetchGetUser } from '../../services/slices/userSlice';
import { useDispatch } from '../../services/store';

const App = () => {
  const profileMatch = useMatch('profile/orders/:number')?.params.number;
  const feedMatch = useMatch('feed/:number')?.params.number;
  const orderNumber = profileMatch || feedMatch;
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state?.background;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetUser());
    dispatch(fetchIngredients());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/feed' element={<Feed />} />
        <Route
          path='*'
          element={
            <div className={styles.detailPageWrap}>
              <NotFound404 />
            </div>
          }
        />
        <Route path='/' element={<ConstructorPage />} />
        <Route
          path='/ingredients/:id'
          element={
            <div className={styles.detailPageWrap}>
              <p className={`text text_type_main-large ${styles.detailHeader}`}>
                Детали ингредиента
              </p>
              <IngredientDetails />
            </div>
          }
        />
        <Route
          path='/feed/:id'
          element={
            <div className={styles.detailPageWrap}>
              <p className={`text text_type_main-large ${styles.detailHeader}`}>
                {(orderNumber && orderNumber.padStart(7, '#0')) || ''}
              </p>
              <OrderInfo />
            </div>
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
          path='/profile/orders/:id'
          element={
            <ProtectedRoute>
              <div className={styles.detailPageWrap}>
                <p
                  className={`text text_type_main-large ${styles.detailHeader}`}
                >
                  {(orderNumber && orderNumber.padStart(7, '#0')) || ''}
                </p>
                <OrderInfo />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
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
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
      </Routes>

      {background && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal
                children={<IngredientDetails />}
                title={'Детали ингредиента'}
                onClose={() => {
                  navigate('/');
                }}
              />
            }
          />
          <Route
            path='/feed/:id'
            element={
              <Modal
                children={<OrderInfo />}
                title={(orderNumber && orderNumber.padStart(7, '#0')) || ''}
                onClose={() => {
                  navigate('/feed');
                }}
              />
            }
          />
          <Route
            path='/profile/orders/:id'
            element={
              <Modal
                children={
                  <ProtectedRoute>
                    <OrderInfo />
                  </ProtectedRoute>
                }
                title={(orderNumber && orderNumber.padStart(7, '#0')) || ''}
                onClose={() => {
                  navigate('/profile/orders');
                }}
              />
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;

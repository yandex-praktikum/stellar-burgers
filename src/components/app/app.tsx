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

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  useMatch
} from 'react-router-dom';
import { ProtectedRoute } from '../protected-route/protected-route';
import { useEffect } from 'react';
import { fetchIngredients } from '../../slices/ingredientsListSlice';
import { useDispatch } from '../../services/store';
import { closeOrderModalData } from '../../slices/orderSlice';
import { fetchUser } from '../../slices/userSlice';

const App = () => {
  const dispatch = useDispatch();

  const location = useLocation();
  const backgroundLocation = location.state?.background;
  const navigate = useNavigate();
  const profileMatch = useMatch('/profile/orders/:number')?.params.number;
  const feedMatch = useMatch('/feed/:number')?.params.number;
  const orderNumber = profileMatch || feedMatch;

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchIngredients());
  }, []);

  const closeModalData = () => {
    navigate(-1);
    dispatch(closeOrderModalData());
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
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
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/feed/:number'
          element={
            <div className={styles.detailPageWrap}>
              <p
                className={`text text_type_digits-default ${styles.detailHeader}`}
              >
                #{orderNumber && orderNumber.padStart(6, '0')}
              </p>
              <OrderInfo />
            </div>
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

      {backgroundLocation && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title={`#${orderNumber}`} onClose={closeModalData}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={closeModalData}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal
                  title={`#${orderNumber && orderNumber.padStart(6, '0')}`}
                  onClose={closeModalData}
                >
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;

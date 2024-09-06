import {
  ConstructorPage,
  Feed,
  NotFound404,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  ProfileOrders,
  Profile
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  NavigateFunction
} from 'react-router-dom';
import { useEffect } from 'react';
import { ProtectedRoute } from '../protected-route/protected-route';
import { getIngredients } from '../../services/slices/ingredientsSlice';
import { AppHeader, Modal, OrderInfo, IngredientDetails } from '@components';
import { useDispatch } from '../../services/store';
import { checkUser } from '../../services/slices/profileSlice';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const backgroundLocation = location.state?.background;

  useEffect(() => {
    dispatch(checkUser());
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
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
        <Route path='' element={<NotFound404 />} />
      </Routes>

      {backgroundLocation && <ModalRoutes navigate={navigate} />}
    </div>
  );
};

interface ModalRoutesProps {
  navigate: NavigateFunction; // Define the type for navigate prop
}

const ModalRoutes: React.FC<ModalRoutesProps> = ({ navigate }) => {
  return (
    <Routes>
      <Route
        path='/feed/:number'
        element={
          <Modal title='Детали заказа' onClose={() => navigate('/feed')}>
            <OrderInfo />
          </Modal>
        }
      />
      <Route
        path='/ingredients/:id'
        element={
          <Modal title='Детали ингредиента' onClose={() => navigate('/')}>
            <IngredientDetails />
          </Modal>
        }
      />
      <Route
        path='/profile/orders/:number'
        element={
          <Modal
            title='Детали заказа'
            onClose={() => navigate('/profile/orders')}
          >
            <OrderInfo />
          </Modal>
        }
      />
    </Routes>
  );
};

export default App;

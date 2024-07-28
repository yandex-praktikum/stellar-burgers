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
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { useEffect } from 'react';
import { useDispatch } from '../../services/store';
import { fetchIngredients } from '../../services/ingredients/action';
import { OnlyAuth, OnlyUnAuth } from '../protected-route/protected-route';
import { checkUserAuth } from '../../services/auth/action';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const backgroundLocation = location.state?.background;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(fetchIngredients());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/login' element={<OnlyUnAuth component={<Login />} />} />
        <Route
          path='/register'
          element={<OnlyUnAuth component={<Register />} />}
        />
        <Route
          path='/forgot-password'
          element={<OnlyUnAuth component={<ForgotPassword />} />}
        />
        <Route
          path='/reset-password'
          element={<OnlyUnAuth component={<ResetPassword />} />}
        />
        <Route path='/profile' element={<OnlyAuth component={<Profile />} />} />
        <Route
          path='/profile/orders'
          element={<OnlyAuth component={<ProfileOrders />} />}
        />
        <Route path='*' element={<NotFound404 />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route
          path='/profile/orders/:number'
          element={<OnlyAuth component={<OrderInfo />} />}
        />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal
                title='Заказ'
                children={<OrderInfo />}
                onClose={() => navigate('/feed')}
              />
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal
                title='Детали ингредиента'
                children={<IngredientDetails />}
                onClose={() => navigate('/')}
              />
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal
                title='Заказ'
                children={<OnlyAuth component={<OrderInfo />} />}
                onClose={() => navigate('/profile/orders')}
              />
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;

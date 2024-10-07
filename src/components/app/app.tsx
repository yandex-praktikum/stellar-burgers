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

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../services/store';
import { useEffect } from 'react';
import { checkAuthorization } from '../../services/reducers/authorization';
import { fetchIngredients } from '../../services/reducers/ingredients';
import { IsAuthorized, NotAuthorized } from '../protected/protected';

const App = () => {
  const location = useLocation();
  const bgLocation = location.state?.background;
  const nav = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuthorization());
    dispatch(fetchIngredients());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={bgLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='*' element={<NotFound404 />} />
        <Route
          path='/profile'
          element={<IsAuthorized component={<Profile />} />}
        />
        <Route
          path='/login'
          element={<NotAuthorized component={<Login />} />}
        />
        <Route
          path='/register'
          element={<NotAuthorized component={<Register />} />}
        />
        <Route
          path='/forgot-password'
          element={<NotAuthorized component={<ForgotPassword />} />}
        />
        <Route
          path='/reset-password'
          element={<NotAuthorized component={<ResetPassword />} />}
        />
        <Route
          path='/profile/orders'
          element={<IsAuthorized component={<ProfileOrders />} />}
        />
      </Routes>
      {bgLocation && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal
                title='Order'
                children={<OrderInfo />}
                onClose={() => nav('/feed')}
              />
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal
                title='Details'
                children={<IngredientDetails />}
                onClose={() => nav('/')}
              />
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal
                title='Заказ'
                children={<IsAuthorized component={<OrderInfo />} />}
                onClose={() => nav('/profile/orders')}
              />
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;

import '../../index.css';
import styles from './app.module.css';
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Outlet
} from 'react-router-dom';
import {
  ConstructorPage,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404,
  Feed
} from '@pages';
import { IngredientDetails, OrderInfo } from '@components';
import { Modal } from '@components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getIngredients } from '../../services/ingredients/actions';
import { getUser } from '../../services/user/action';
import {
  selectIsLoading,
  selectError as selectIngredientsError
} from '../../services/ingredients/ingredientsSlice';
import { AppHeader } from '@components';
import { Preloader } from '@ui';
import { AuthRoute } from '../protected-route/authRoute';
import { UnAuthRoute } from '../protected-route/unAuthRoute';
import type { RootState } from '../../services/store';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const handleCloseModal = () => {
    navigate(-1);
  };

  const isLoading = useSelector(selectIsLoading);
  const Error = useSelector(selectIngredientsError);
  const isUserChecked = useSelector(
    (state: RootState) => state.user.isUserChecked
  );
  useEffect(() => {
    dispatch(getIngredients());
    dispatch(getUser());
  }, [dispatch]);

  const state = location.state as { background?: Location };

  if (!isUserChecked) {
    return (
      <div className={styles.app}>
        <AppHeader />
        <Preloader />
      </div>
    );
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      {isLoading ? (
        <Preloader />
      ) : Error ? (
        <div>Error</div>
      ) : (
        <>
          <Routes location={state?.background || location}>
            <Route path='/' element={<Layout />}>
              <Route index element={<ConstructorPage />} />
              <Route path='feed' element={<Feed />} />
              <Route path='ingredients/:id' element={<IngredientDetails />} />
              <Route path='feed/:number' element={<OrderInfo />} />

              <Route
                path='login'
                element={
                  <UnAuthRoute>
                    <Login />
                  </UnAuthRoute>
                }
              />
              <Route
                path='register'
                element={
                  <UnAuthRoute>
                    <Register />
                  </UnAuthRoute>
                }
              />
              <Route
                path='forgot-password'
                element={
                  <UnAuthRoute>
                    <ForgotPassword />
                  </UnAuthRoute>
                }
              />
              <Route
                path='reset-password'
                element={
                  <UnAuthRoute>
                    <ResetPassword />
                  </UnAuthRoute>
                }
              />
              <Route
                path='profile'
                element={
                  <AuthRoute>
                    <Profile />
                  </AuthRoute>
                }
              />
              <Route
                path='profile/orders'
                element={
                  <AuthRoute>
                    <ProfileOrders />
                  </AuthRoute>
                }
              />
              <Route
                path='profile/orders/:number'
                element={
                  <AuthRoute>
                    <OrderInfo />
                  </AuthRoute>
                }
              />
              <Route path='*' element={<NotFound404 />} />
            </Route>
          </Routes>

          {state?.background && (
            <Routes>
              <Route
                path='ingredients/:id'
                element={
                  <Modal title='' onClose={handleCloseModal}>
                    <IngredientDetails />
                  </Modal>
                }
              />

              <Route
                path='feed/:number'
                element={
                  <Modal title='' onClose={handleCloseModal}>
                    <OrderInfo />
                  </Modal>
                }
              />

              <Route
                path='profile/orders/:number'
                element={
                  <AuthRoute>
                    <Modal title='' onClose={handleCloseModal}>
                      <OrderInfo />
                    </Modal>
                  </AuthRoute>
                }
              />
            </Routes>
          )}
        </>
      )}
    </div>
  );
};

const Layout = () => <Outlet />;

export default App;

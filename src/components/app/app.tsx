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
import {
  IngredientDetails,
  Modal,
  OrderInfo,
  ProtectedRoute,
  AppLayout
} from '@components';
import '../../index.css';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from '@store';
import { fetchIngredients, fetchUser, resetOrderModalData } from '@slices';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as { background?: Location };

  const handleModalClose = () => {
    navigate(-1);
    dispatch(resetOrderModalData());
  };

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <AppLayout>
      <>
        <Routes location={state?.background || location}>
          <Route path='/' element={<ConstructorPage />} />
          <Route path='/feed'>
            <Route index element={<Feed />} />
            <Route path=':number' element={<OrderInfo />} />
          </Route>
          <Route path='/ingredients/:id' element={<IngredientDetails />} />
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
          <Route path='/profile'>
            <Route
              index
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path='orders'
              element={
                <ProtectedRoute>
                  <ProfileOrders />
                </ProtectedRoute>
              }
            />
            <Route
              path='orders/:number'
              element={
                <ProtectedRoute>
                  <OrderInfo />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path='*' element={<NotFound404 />} />
        </Routes>
        {state?.background && (
          <Routes>
            <Route
              path='/feed/:number'
              element={
                <Modal title='Детали заказа' onClose={handleModalClose}>
                  <OrderInfo isModal />
                </Modal>
              }
            />
            <Route
              path='/ingredients/:id'
              element={
                <Modal title='Детали ингредиента' onClose={handleModalClose}>
                  <IngredientDetails isModal />
                </Modal>
              }
            />
            <Route
              path='/profile/orders/:number'
              element={
                <ProtectedRoute>
                  <Modal title='Детали заказа' onClose={handleModalClose}>
                    <OrderInfo isModal />
                  </Modal>
                </ProtectedRoute>
              }
            />
          </Routes>
        )}
      </>
    </AppLayout>
  );
};

export default App;

// import {
//   ConstructorPage,
//   Feed,
//   ForgotPassword,
//   Login,
//   NotFound404,
//   Profile,
//   ProfileOrders,
//   Register,
//   ResetPassword
// } from '@pages';
// import '../../index.css';
// import styles from './app.module.css';

// import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
// import {
//   Routes,
//   Route,
//   useLocation,
//   Navigate,
//   useParams
// } from 'react-router-dom';
// import { useEffect } from 'react';
// import { fetchIngredients } from '../../services/ingredientsSlice';
// import { useDispatch, useSelector } from '../../services/store';
// import {
//   checkUserAuth,
//   getAuthChecked,
//   getUser
// } from '../../services/authSlice';
// import { ProtectedRoute } from '../protected-route';

// const App = () => {
//   const location = useLocation();
//   const backgroundLocation = location.state?.background;
//   const dispatch = useDispatch();
//   const isAuthenticated = useSelector(getAuthChecked);

//   useEffect(() => {
//     dispatch(getUser());
//     dispatch(fetchIngredients());
//   }, [dispatch]);

//   return (
//     <div className={styles.app}>
//       <AppHeader />
//       <Routes location={backgroundLocation || location}>
//         <Route path='*' element={<NotFound404 />} />
//         <Route path='/' element={<ConstructorPage />} />
//         <Route path='/feed' element={<Feed />} />
//         <Route
//           path='/login'
//           element={
//             <ProtectedRoute onlyUnAuth>
//               <Login />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path='/register'
//           element={
//             <ProtectedRoute onlyUnAuth>
//               <Register />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path='/forgot-password'
//           element={
//             <ProtectedRoute onlyUnAuth>
//               <ForgotPassword />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path='/reset-password'
//           element={
//             <ProtectedRoute onlyUnAuth>
//               <ResetPassword />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path='/profile'
//           element={
//             <ProtectedRoute>
//               <Profile />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path='/profile/orders'
//           element={
//             <ProtectedRoute>
//               <ProfileOrders />
//             </ProtectedRoute>
//           }
//         />
//         {/* отображение содержимого модалок по прямой ссылке */}
//         <Route path='/feed/:number' element={<OrderInfo />} />
//         <Route path='/ingredients/:id' element={<IngredientDetails />} />
//         <Route path='/profile/orders/:number' element={<OrderInfo />} />
//       </Routes>
//       {/* модалки */}
//       {backgroundLocation && (
//         <Routes>
//           <Route
//             path='/feed/:number'
//             element={
//               <Modal title={`Заказ`} onClose={() => window.history.back()}>
//                 <OrderInfo />
//               </Modal>
//             }
//           />

//           <Route
//             path='/ingredients/:id'
//             element={
//               <Modal
//                 title='Детали ингредиента'
//                 onClose={() => window.history.back()}
//               >
//                 <IngredientDetails />
//               </Modal>
//             }
//           />
//           <Route
//             path='/profile/orders/:number'
//             element={
//               <Modal title='Заказ' onClose={() => window.history.back()}>
//                 <OrderInfo />
//               </Modal>
//             }
//           />
//         </Routes>
//       )}
//     </div>
//   );
// };

// export default App;

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
import {
  Routes,
  Route,
  useLocation,
  Navigate,
  useParams
} from 'react-router-dom';
import { useEffect } from 'react';
import { fetchIngredients } from '../../services/ingredientsSlice';
import { useDispatch, useSelector } from '../../services/store';
import {
  checkUserAuth,
  getAuthChecked,
  getUser
} from '../../services/authSlice';
import { ProtectedRoute } from '../protected-route';

const App = () => {
  const location = useLocation();
  const backgroundLocation = location.state?.background;
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(getAuthChecked);

  useEffect(() => {
    dispatch(getUser());
    dispatch(fetchIngredients());
  }, [dispatch]);

  const ModalWithOrderNumber = () => {
    const { number } = useParams();
    return (
      <Modal title={`#0${number}`} onClose={() => window.history.back()}>
        <OrderInfo />
      </Modal>
    );
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='*' element={<NotFound404 />} />
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
        {/* отображение содержимого модалок по прямой ссылке */}
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='/profile/orders/:number' element={<OrderInfo />} />
      </Routes>
      {/* модалки */}
      {backgroundLocation && (
        <Routes>
          <Route path='/feed/:number' element={<ModalWithOrderNumber />} />
          <Route
            path='/ingredients/:id'
            element={
              <Modal
                title='Детали ингредиента'
                onClose={() => window.history.back()}
              >
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={<ModalWithOrderNumber />}
          />
        </Routes>
      )}
    </div>
  );
};

export default App;

// import {
//   ConstructorPage,
//   NotFound404,
//   Feed,
//   Login,
//   Register,
//   ForgotPassword,
//   ResetPassword,
//   Profile,
//   ProfileOrders
// } from '@pages';
// import '../../index.css';
// import styles from './app.module.css';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
// import { useNavigate } from 'react-router-dom';
// import ProtectedRoute from './protected-route/protected-route';
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   getIngredients,
//   getIngredientsSelector
// } from '../../services/slices/ingredientsSlice';
// import { AppDispatch } from 'src/services/store';

// const App = () => {
//   const navigate = useNavigate();
//   const dispatch: AppDispatch = useDispatch();
//   const handleClose = () => {
//     navigate(-1); // Вернуться на предыдущий URL при закрытии модалки
//   };
//   const ingredients = useSelector(getIngredientsSelector);
//   useEffect(() => {
//     if (!ingredients.length) {
//       dispatch(getIngredients());
//     }
//   }, []);

//   return (
//     <div className={styles.app}>
//       <AppHeader />
//       <Routes location={backgroundLocation || location >

//         <Route path='/' element={<ConstructorPage />} />
//         <Route path='/feed' element={<Feed />} />
//         <Route path='/login' element={<Login />} />
//         <Route path='/register' element={<Register />} />
//         <Route path='/forgot-password' element={<ForgotPassword />} />
//         <Route path='/reset-password' element={<ResetPassword />} />
//         <Route
//           path='/profile'
//           element={
//             <ProtectedRoute>
//               <Profile />
//             </ProtectedRoute>
//           }
//         />
//         {/* <Route path='/profile/orders' element={<ProfileOrders />}>
//             <Route
//               path='/profile/orders/:number'
//               element={
//                 <Modal title='OrderNumber' onClose={handleClose}>
//                   <OrderInfo />
//                 </Modal>
//               }
//             />
//           </Route>
//         </Route> */}
//         {/* <Route
//           path='/ingredients/:id'
//           element={
//             <Modal title='Описание' onClose={handleClose}>
//               <IngredientDetails />
//             </Modal>
//           }
//         /> */}

//         <Route path='*' element={<NotFound404 />} />
//       </Routes>

//       <Routes>
//         <Route
//           path='/feed/:number'
//           element={
//             <Modal title='Детали заказа' onClose={handleClose}>
//               <OrderInfo />
//             </Modal>
//           }
//         />
//         <Route
//           path='/ingredients/:id'
//           element={
//             <Modal title='Детали ингредиента' onClose={handleClose}>
//               <IngredientDetails />
//             </Modal>
//           }
//         />
//         <Route
//           path='/profile/orders/:number'
//           element={
//             <Modal title='Детали заказа' onClose={handleClose}>
//               <OrderInfo />
//             </Modal>
//           }
//         />
//       </Routes>
//     </div>
//   );
// };

// export default App;

// по роуту / расположите компонент ConstructorPage;
// по роуту /feed расположите компонент Feed;
// по защищённому роуту /login расположите компонент Login;
// по защищённому роуту /register расположите компонент Register;
// по защищённому роуту /forgot-password расположите компонент ForgotPassword;
// по защищённому роуту /reset-password расположите компонент ResetPassword;
// по защищённому роуту /profile расположите компонент Profile;
// по защищённому роуту /profile/orders расположите компонент ProfileOrders;
// по роуту * расположите компонент NotFound404.

// Также нужно добавить модалки с дополнительной информацией:
// по роуту /feed/:number расположите компонент Modal с компонентом OrderInfo;
// по роуту /ingredients/:id расположите компонент Modal с компонентом IngredientsDetails;
// по защищённому роуту /profile/orders/:number расположите компонент Modal с компонентом OrderInfo.

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
import '../../index.css';
import styles from './app.module.css';
import { useDispatch, useSelector } from '../../services/store';
import { AppHeader, IngredientDetails } from '@components';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate
} from 'react-router-dom';
import { Modal } from '../modal/modal';
import { OrderInfo } from '../order-info/order-info';
import { useEffect } from 'react';
import {
  getIngredients,
  getIngredientsSelector
} from '../../services/slices/ingredientsSlice';
import {
  ProtectedRoute,
  OnlyAuth,
  OnlyUnAuth
} from './protected-route/protected-route';
import { getCookie } from '../../utils/cookie';

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  // Если `location.state?.background` определен, используем его как предыдущее состояние для отображения модалки
  const backgroundLocation = location.state?.background;

  const ingredients = useSelector(getIngredientsSelector);

  function handleClose() {
    navigate(-1);
  }

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(getIngredients());
    }
  }, []);

  // useEffect(() => {
  // dispatch(checkUserAuth())
  // .unwrap()
  // .catch((error) => {
  //   console.error('Error during user authentication check:', error);
  // });
  //   const accessToken = getCookie('accessToken');
  //   console.log('app Access Token:', accessToken);
  //   const refreshToken = localStorage.getItem('refreshToken');
  //   console.log('app Refresh Token:', refreshToken);
  //   dispatch(getIngredients());
  // }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
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
          element={<OnlyAuth component={<ResetPassword />} />}
        />

        <Route path='/profile' element={<OnlyAuth component={<Profile />} />} />
        <Route
          path='/profile/orders'
          element={<OnlyAuth component={<ProfileOrders />} />}
        />
        <Route
          path='/profile/orders/:number'
          element={<OnlyAuth component={<OrderInfo />} />}
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
      {location.state?.background && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title='Детали заказа' onClose={handleClose}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={handleClose}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal title='Детали заказа' onClose={handleClose}>
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;

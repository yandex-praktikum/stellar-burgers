import {
  ConstructorPage,
  NotFound404,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';

const App = () => {
  const handleClose = () => null;

  return (
    <div className={styles.app}>
      <AppHeader />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ConstructorPage />} />
          <Route path='/feed' element={<Feed />}>
            <Route
              path='/feed:number'
              element={
                <Modal title='FeedNumber' onClose={handleClose}>
                  <OrderInfo />
                </Modal>
              }
            />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/profile' element={<Profile />}>
            <Route path='/profile/orders' element={<ProfileOrders />}>
              <Route
                path='/profile/orders/:number'
                element={
                  <Modal title='OrderNumber' onClose={handleClose}>
                    <OrderInfo />
                  </Modal>
                }
              />
            </Route>
          </Route>
          <Route
            path='/ingredients:id'
            element={
              <Modal title='IngredientId' onClose={handleClose}>
                <IngredientDetails />
              </Modal>
            }
          />

          <Route path='*' element={<NotFound404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

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

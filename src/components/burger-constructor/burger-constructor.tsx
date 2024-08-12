import { FC, useMemo, useCallback } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import {
  getBurgerPrice,
  getConstructorState,
  resetConstructor
} from '../../services/slices/constructorSlice';
import {
  getOrderModalData,
  getOrderRequest,
  resetOrder,
  placeNewOrder
} from '../../services/slices/newOrderSlice';
import { isAuthCheckedSelector } from '../../services/slices/userSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const constructorItems = useSelector(getConstructorState);
  const orderRequest = useSelector(getOrderRequest);
  const orderModalData = useSelector(getOrderModalData);
  const isAuth = useSelector(isAuthCheckedSelector);
  const price = useSelector(getBurgerPrice);

  const onOrderClick = useCallback(() => {
    if (!isAuth) {
      navigate('/login');
      return;
    }

    if (constructorItems.bun && constructorItems.ingredients?.length > 0) {
      const dataToOrder = [
        constructorItems.bun._id,
        ...constructorItems.ingredients.map(
          (ingredient: { _id: any }) => ingredient._id
        ),
        constructorItems.bun._id
      ];
      dispatch(placeNewOrder(dataToOrder));
    }
  }, [isAuth, constructorItems, dispatch, navigate]);

  const closeOrderModal = () => {
    dispatch(resetOrder());
    dispatch(resetConstructor());
    navigate('/');
  };

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};

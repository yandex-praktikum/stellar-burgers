import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  getComponents,
  resetConstructorState
} from '../../services/slices/burgerConstructor';
import { useSelector } from 'react-redux';
import {
  createOrder,
  getOrder,
  getOrderRequest,
  resetOrder
} from '../../services/slices/order';
import { useDispatch } from '../../services/store';
import { getIsAuthorized } from '../../services/slices/userData';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const constructorItems = useSelector(getComponents);
  const orderRequest = useSelector(getOrderRequest);
  const orderModalData = useSelector(getOrder);
  const isAuthorized = useSelector(getIsAuthorized);

  const onOrderClick = () => {
    if (isAuthorized) {
      if (!constructorItems.bun || orderRequest) return;
      const orderData = [
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((ingredient) => ingredient._id)
      ];
      dispatch(createOrder(orderData));
    } else {
      navigate('/login');
    }
  };
  const closeOrderModal = () => {
    dispatch(resetOrder());
    dispatch(resetConstructorState());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

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

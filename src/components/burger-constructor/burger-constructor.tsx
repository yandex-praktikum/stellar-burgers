import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  getComponents,
  resetConstructorState
} from '../../services/slices/constructor';
import { useSelector } from 'react-redux';
import {
  createOrder,
  getOrder,
  getOrderRequest,
  resetOrder
} from '../../services/slices/order';
import { useDispatch } from '../../services/store';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const constructorItems = useSelector(getComponents);
  const orderRequest = useSelector(getOrderRequest);
  const orderModalData = useSelector(getOrder);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    const orderData = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((ingredient) => ingredient._id)
    ];
    dispatch(createOrder(orderData));
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

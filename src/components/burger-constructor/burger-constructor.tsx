import { FC, useMemo } from 'react';
import { TConstructorIngredient, TOrder } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useAppDispatch, useAppSelector } from '@store';
import {
  clearJustCreatedOrder,
  createOrder,
  resetConstructor,
  selectConstructorItems,
  selectjustCreatedOrder,
  selectOrdersLoadingState,
  selectUser
} from '@slices';

import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const constructorItems = useAppSelector(selectConstructorItems);
  const user = useAppSelector(selectUser);
  const orderRequest = useAppSelector(selectOrdersLoadingState);
  const orderModalData = useAppSelector(selectjustCreatedOrder);

  const onOrderClick = async () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) {
      navigate('/login');
    } else {
      const ingredientsIds = constructorItems.ingredients.map(
        (item) => item._id
      );
      ingredientsIds.push(constructorItems.bun._id);
      const result = await dispatch(createOrder(ingredientsIds));
      result.meta.requestStatus === 'fulfilled' && dispatch(resetConstructor());
    }
  };

  const closeOrderModal = () => {
    dispatch(clearJustCreatedOrder());
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

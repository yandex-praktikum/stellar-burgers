import { FC, useEffect, useMemo } from 'react';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { RootState, useDispatch } from '../../../src/services/store';
import { useSelector } from 'react-redux';
import {
  selectIsLoading,
  selectConstructorItems,
  selectOrderRequest,
  selectModalOrderData,
  closeModal,
  openModal
} from '@slices';
import burgerSlice, {
  closeOrderModalAction,
  fetchOrderBurger,
  openOrderModalAction
} from '../../../src/services/slices/orderSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();

  const constructorItems: any = useSelector(selectConstructorItems);
  console.log(
    'BurgerConstructor constructorItems: ',
    JSON.stringify(constructorItems)
  );

  const orderRequest = useSelector(
    (state: any) => state.orderReducer.isLoading
  );
  console.log('BurgerConstructor orderRequest: ', JSON.stringify(orderRequest));

  const orderModalData = useSelector(
    (state: any) => state.orderReducer.orderModalData
  );

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    console.log('constructorItems: ', JSON.stringify(constructorItems));
    dispatch(openOrderModalAction());
    dispatch(
      fetchOrderBurger([
        constructorItems.bun._id,
        ...constructorItems.ingredients.map(
          (ingredient: TIngredient) => ingredient._id
        )
      ])
    );
  };
  const closeOrderModal = () => {
    console.log('closeOrderModal');
    dispatch(closeOrderModalAction());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun && constructorItems.bun.price
        ? constructorItems.bun.price * 2
        : 0) +
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

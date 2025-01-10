import { FC, useEffect, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { RootState, useDispatch } from '../../../src/services/store';
import { useSelector } from 'react-redux';
import {
  selectIsLoading,
  selectConstructorItems,
  selectOrderRequest,
  selectModalOrderData
} from '@slices';
import burgerSlice, {
  fetchIngredients
} from '../../../src/services/slices/burgerSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */

  const constructorItems: any = useSelector(selectConstructorItems);
  console.log(
    'BurgerConstructor constructorItems: ',
    JSON.stringify(constructorItems)
  );

  const orderRequest = useSelector(selectOrderRequest);

  const orderModalData = useSelector(selectModalOrderData);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
  };
  const closeOrderModal = () => {};

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

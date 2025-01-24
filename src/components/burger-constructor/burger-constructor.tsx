import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from 'react-redux';
import { selectConstructorItems } from '../../slices/builderSlice';
import {
  clearOrderModalData,
  selectOrderModalData,
  selectOrderRequest,
  createOrder
} from '../../slices/orderSlice';
import { TNewOrderResponse } from '@api';
import { AppDispatch } from 'src/services/store';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */

  /*const constructorItems = {
    bun: {
      price: 0
    },
    ingredients: []
  };*/
  const dispatch = useDispatch<AppDispatch>();

  const constructorItems = useSelector(selectConstructorItems);

  //const { bun, ingredients } = useSelector(selectConstructorItems);
  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectOrderModalData);

  //const orderModalData = null;

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    const order = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((ingredient) => ingredient._id),
      constructorItems.bun._id
    ];
    dispatch(createOrder(order));
  };

  const closeOrderModal = () => {
    dispatch(clearOrderModalData());
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

import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from 'react-redux';
import { selectConstructorItems } from '../../slices/constructorSlice';
import {
  loadOrderRequest,
  loadOrderSuccess,
  loadOrderError,
  clearOrderDetails,
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
  const { bun, ingredients } = useSelector(selectConstructorItems);
  const orderRequest = useSelector(selectOrderRequest);

  const onOrderClick = () => null;
  const orderModalData = null;

  /*const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
  };
  const closeOrderModal = () => {};

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );*/

  /*const onOrderClick = async () => {
    if (!bun || orderRequest) return; // Проверка: есть ли булочка и не идет ли запрос

    dispatch(loadOrderRequest()); // Установить состояние запроса

    try {
      // Преобразуем массив TConstructorIngredient в массив строк
        const ingredientIds: string[] = ingredients.map(ingredient => ingredient.id);

      const result = await dispatch(createOrder({ ingredients: ingredientIds })) as {
        type: string;
        payload: TNewOrderResponse | string;
      };

       // Проверяем, успешен ли результат
      if (createOrder.fulfilled.match(result)) {
        dispatch(loadOrderSuccess(result.payload)); // Успешно загружаем заказ
      } else {
        dispatch(loadOrderError(result.payload)); // Обработка ошибки
      }
    } catch (error) {
      dispatch(loadOrderError(error)); // Обработка ошибки
    }
  };*/

  const price = useMemo(
    () =>
      (bun ? bun.price * 2 : 0) +
      ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [bun, ingredients]
  );

  const closeOrderModal = () => {
    dispatch(clearOrderDetails());
  };

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={{ bun, ingredients }}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};

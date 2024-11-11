import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../services/store';
import { createOrder } from '../../services/slices/orderSlice';
import { clearCurrentOrder } from '../../services/slices/orderSlice';
import { clearConstructor } from '../../services/slices/constructorSlice';

export const BurgerConstructor: FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const constructorItems = useSelector(
    (state: RootState) => state.constructorBurger
  );

  const orderRequest = useSelector((state: RootState) => state.order.isLoading);

  const orderModalData = useSelector(
    (state: RootState) => state.order.currentOrder
  );

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    // Подготавливаем массив ингредиентов для отправки
    const ingredientsForOrder = [
      constructorItems.bun._id, // добавляем булку дважды — сверху и снизу
      ...constructorItems.ingredients.map((ingredient) => ingredient._id),
      constructorItems.bun._id // второй раз для нижней булки
    ];
    // Отправляем заказ с помощью экшена createOrder
    dispatch(createOrder(ingredientsForOrder));
  };

  const closeOrderModal = () => {
    dispatch(clearCurrentOrder());
    dispatch(clearConstructor());
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

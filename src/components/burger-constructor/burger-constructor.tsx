import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../../src/services/store';
import { fetchOrders, resetConstructor, resetOrderModal } from '@slices';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const { bun, ingredients } = useSelector((store) => store.builder);
  const { isLoading, orderModal } = useSelector((store) => store.orders);
  const { userData } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const constructorItems = { bun, ingredients };

  const orderRequest = isLoading;

  const orderModalData = orderModal;

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest || !userData) return;
    else {
      const ingredientIds = constructorItems.ingredients.map(
        (ingredient) => ingredient._id
      );
      const bunId = constructorItems.bun._id;
      const orderData = [bunId, ...ingredientIds];
      dispatch(fetchOrders(orderData));
    }
  };
  const closeOrderModal = () => {
    dispatch(resetConstructor());
    dispatch(resetOrderModal());
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

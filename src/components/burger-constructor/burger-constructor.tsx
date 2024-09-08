import { TConstructorIngredient } from '@utils-types';
import { FC, useMemo } from 'react';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  emptyConstructor,
  selectConstructorItem
} from '../../services/slices/burgerConstructorSlice';
import {
  clearOrders,
  fetchOrders,
  selectOrders,
  selectquery
} from '../../services/slices/ordersSlice';
import { selectUser } from '../../services/slices/profileSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();
  const constructorItems = useSelector(selectConstructorItem);
  const orderRequest = useSelector(selectquery);
  const orderModalData = useSelector(selectOrders);
  const { user } = useSelector(selectUser);
  const navigate = useNavigate;

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) {
      navigate(), { replace: true };
      return;
    }
    const orderIngredients = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((ingredient) => ingredient._id),
      constructorItems.bun._id
    ];
    dispatch(fetchOrders(orderIngredients));
  };
  const closeOrderModal = () => {
    dispatch(emptyConstructor());
    dispatch(clearOrders());
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

  // return null;

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

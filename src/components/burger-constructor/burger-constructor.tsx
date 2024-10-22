import { TConstructorIngredient } from '@utils-types';
import { FC, useMemo } from 'react';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearConstructor,
  getConstructorState
} from '../../services/slices/burgerConstructorSlice';
import {
  clearOrders,
  fetchOrders,
  selectOrders,
  selectquery
} from '../../services/slices/ordersHistorySlice';
import { selectProfileUser } from '../../services/slices/profileUserSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const constructorItems = useSelector(getConstructorState);
  const orderRequest = useSelector(selectquery);
  const orderModalData = useSelector(selectOrders);
  const navigate = useNavigate();
  const { user } = useSelector(selectProfileUser);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) {
      navigate('/login', { replace: true });
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
    dispatch(clearConstructor());
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

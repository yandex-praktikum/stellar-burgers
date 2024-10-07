import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { resetState, stateSelector } from '../../services/reducers/constructor';
import {
  isLoadingSelector,
  makeOrder,
  orderSelector,
  resetOrder
} from '../../services/reducers/orders';
import { UserSelector } from '../../services/reducers/authorization';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useAppDispatch();
  const constructorItems = useAppSelector(stateSelector);
  const orderRequest = useAppSelector(isLoadingSelector);
  const orderModalData = useAppSelector(orderSelector);
  const user = useAppSelector(UserSelector);
  const nav = useNavigate();
  const data: string[] = [
    ...constructorItems.ingredients.map((ingredient) => ingredient._id),
    constructorItems.bun?._id
  ].filter((id): id is string => id !== undefined);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) {
      nav('/login', { replace: true });
      return;
    }
    dispatch(makeOrder(data));
  };
  const closeOrderModal = () => {
    dispatch(resetOrder());
    dispatch(resetState());
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

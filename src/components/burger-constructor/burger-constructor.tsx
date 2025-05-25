import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useAppDispatch, useAppSelector } from '@app-store';
import {
  BuyBurgerThunk,
  clearConstructor,
  getConstructorIngredients,
  getName,
  getOrderData,
  getStatusBuyBurger
} from '@slices';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const constructorItems = useAppSelector(getConstructorIngredients);
  const orderRequest = useAppSelector(getStatusBuyBurger);
  const userName = useAppSelector(getName);
  const orderModalData = useAppSelector(getOrderData);

  const onOrderClick = () => {
    if (!userName) {
      navigate('/login');
      return;
    }
    if (!constructorItems.bun || orderRequest) return;
    dispatch(
      BuyBurgerThunk([
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((ingredient) => ingredient._id),
        constructorItems.bun._id
      ])
    );
  };
  const closeOrderModal = () => {
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

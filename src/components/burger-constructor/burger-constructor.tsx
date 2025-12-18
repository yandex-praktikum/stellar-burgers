import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  clearOrderModalData,
  createOrder
} from '../../services/slices/BurgerSlice';
import { useAppSelector, useAppDispatch } from '../../services/store';
import { getCookie } from '../../utils/cookie';

export const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const constructorItems = useAppSelector(
    (state) => state.burger.constructorItems
  );
  const orderRequest = useAppSelector((state) => state.burger.orderRequest);
  const orderModalData = useAppSelector((state) => state.burger.orderModalData);

  const isAuth = !!getCookie('accessToken');

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!isAuth) {
      navigate('/login');
      return;
    }

    const ingredientIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun._id
    ];

    dispatch(createOrder(ingredientIds));
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

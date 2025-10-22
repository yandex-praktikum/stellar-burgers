import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '@store';
import { useNavigate } from 'react-router-dom';
import {
  createOrder,
  resetOrderModalData,
  selectBuilderBun,
  selectBuilderIngredients,
  selectIsUserAuthenticated,
  selectOrderModalData,
  selectOrderRequest
} from '@slices';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const bun = useSelector(selectBuilderBun);
  const ingredients = useSelector(selectBuilderIngredients);
  const isAuthenticated = useSelector(selectIsUserAuthenticated);
  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectOrderModalData);

  const onOrderClick = () => {
    if (!bun || orderRequest) return;
    if (!isAuthenticated) return navigate('/login');

    const data = [
      bun._id,
      ...ingredients.map((ingredient) => ingredient._id),
      bun._id
    ];

    dispatch(createOrder(data));
  };

  const closeOrderModal = () => {
    dispatch(resetOrderModalData());
  };

  const price = useMemo(
    () =>
      (bun ? bun.price * 2 : 0) +
      ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [bun, ingredients]
  );

  return (
    <BurgerConstructorUI
      constructorItems={{ bun, ingredients }}
      orderModalData={orderModalData}
      price={price}
      orderRequest={orderRequest}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};

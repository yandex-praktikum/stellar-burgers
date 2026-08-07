import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { RootState, useSelector, useDispatch } from '../../services/store';
import { clearConstructor } from '../../services/slices/constructorSlice';
import { orderBurger, clearOrder } from '../../services/slices/orderSlice';
import { useLocation, useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state: RootState) => state.user.user);
  const constructorItems = useSelector(
    (state: RootState) => state.burgerConstructor
  );

  const orderRequest = useSelector(
    (state: RootState) => state.order.orderRequest
  );

  const orderModalData = useSelector(
    (state: RootState) => state.order.orderModalData
  );

  const onOrderClick = async () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!user) {
      navigate('/login', {
        state: { from: location }
      });
      return;
    }

    const ingredientsIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun._id
    ];

    try {
      await dispatch(orderBurger(ingredientsIds)).unwrap();
      dispatch(clearConstructor());
    } catch {
      // обработка ошибки при необходимости
    }
  };
  const closeOrderModal = () => {
    dispatch(clearOrder());
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

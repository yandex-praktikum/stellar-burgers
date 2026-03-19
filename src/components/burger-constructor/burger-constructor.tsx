import { FC, useMemo } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { createOrder } from '../../services/order/actions';
import { closeOrderModal } from '../../services/order/orderSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const constructorItems = useSelector(
    (state: any) => state.burgerConstructor || {}
  );
  const orderRequest = useSelector((state) => state.order.orderRequest);
  const orderModalData = useSelector((state) => state.order.orderModalData);
  const { isAuth, userRequest } = useSelector((state) => state.user);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest || userRequest) return;
    if (!isAuth) {
      navigate('/login', {
        state: { from: window.location.pathname }
      });
      return;
    }
    dispatch(createOrder());
  };
  const handlecloseOrderModal = () => {
    dispatch(closeOrderModal());
  };

  const price = useMemo(() => {
    if (!constructorItems) return 0;

    return (
      (constructorItems.bun?.price || 0) * 2 +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      )
    );
  }, [constructorItems]);

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest || false}
      constructorItems={constructorItems || { bun: null, ingredients: [] }}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={handlecloseOrderModal}
    />
  );
};

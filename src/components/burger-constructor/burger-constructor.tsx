import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../../src/services/store';
import { selectIsAuthenticated } from '../../../src/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { clearOrder, placeOrder } from '../../../src/slices/orderSlice';
import { clearOrderDetails } from '../../../src/slices/orderDetailsSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector((state) => state.constructorItems);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const orderRequest = useSelector((state) => state.order.isPending);

  const orderModalData = useSelector((state) => state.order.order);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!isAuthenticated) {
      navigate('/login');
    } else if (isAuthenticated) {
      const orderData = [
        ...constructorItems.ingredients.map((item) => item._id),
        constructorItems.bun._id,
        constructorItems.bun._id
      ];
      dispatch(placeOrder(orderData));
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

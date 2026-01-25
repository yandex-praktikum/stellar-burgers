import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import {
  clearOrder,
  placeOrder
} from '../../services/slices/slice-order/slice-order';
import { useLocation, useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector((state) => state.burgerConstructor);
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */

  const { orderRequest, orderModalData } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const bunId = constructorItems.bun?._id;
  const ingredientsIds = constructorItems.ingredients.map((item) => item._id);

  const orderIds = bunId ? [bunId, ...ingredientsIds, bunId] : ingredientsIds;

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) {
      return;
    }
    if (!user) {
      navigate('/login', { state: { from: location } });
    } else {
      dispatch(placeOrder(orderIds));
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

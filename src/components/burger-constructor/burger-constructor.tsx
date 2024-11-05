import { useEffect, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearOrder,
  getNewOrderModalData,
  getNewOrderRequest,
  getNewOrder
} from '../../services/slices/order/new-order';
import { useNavigate } from 'react-router-dom';
import { clearBurgerCart } from '../../services/slices/burger-cart/burger-cart';
import { checkUserAuth } from '../../services/slices/user/user';

export const BurgerConstructor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const orderRequest = useSelector(getNewOrderRequest);
  const orderModalData = useSelector(getNewOrderModalData);
  const userIsAuth = useSelector(checkUserAuth);

  const { bun, ingredients } = useSelector((state) => state.cart);

  const constructorItems = {
    bun,
    ingredients
  };

  const onOrderClick = () => {
    if (!userIsAuth) {
      navigate('/login');
    } else if (
      constructorItems.bun &&
      constructorItems.ingredients.length > 0
    ) {
      const dataNewOrder = [
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((ingredient) => ingredient._id),
        constructorItems.bun._id
      ];
      dispatch(getNewOrder(dataNewOrder));
    }
  };

  const closeOrderModal = () => {
    dispatch(clearOrder());
    navigate('/');
    dispatch(clearBurgerCart());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (total: number, item: TConstructorIngredient) => total + item.price,
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

import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
// import { selectOrders, getFeeds } from '../../services/slices/feedSlice';
import {
  selectConstructorItem,
  emptyConstructor
} from '../../services/slices/burgerContructorSlice';
import { useSelector, useDispatch } from '../../services/store';
import {
  selectOrderData,
  selectOrderRequest,
  postOrder,
  clearOrderData
} from '../../services/slices/orderSlice';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../../services/slices/userSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора - done*/
  const dispatch = useDispatch();
  const constructorItems = useSelector(selectConstructorItem);
  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectOrderData);
  const { user } = useSelector(selectUser);
  const navigate = useNavigate();

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) {
      navigate('/login'), { replace: true };
      return;
    }
    const orderIngredients = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((ingredient) => ingredient._id),
      constructorItems.bun._id
    ];
    dispatch(postOrder(orderIngredients));
  };

  const closeOrderModal = () => {
    dispatch(emptyConstructor());
    dispatch(clearOrderData());
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

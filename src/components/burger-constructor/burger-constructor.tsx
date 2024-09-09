import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  getBurger,
  IConstructorState,
  getAllIngredients,
  clearIngredients
} from '../../services/constructorSlice';
import { getIngredients } from '../../services/ingredientsSlice';
import {
  clearOrder,
  createOrder,
  getLoading,
  getOrder
} from '../../services/ordersSlice';
import { getAuthUser } from '../../services/authSlice';
import { useLocation, useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector(getBurger);
  const orderRequest = useSelector(getLoading);
  const orderModalData = useSelector(getOrder);
  const user = useSelector(getAuthUser);
  const navigate = useNavigate();
  const location = useLocation();

  const burgerIngredients: string[] = useSelector(getAllIngredients);

  const onOrderClick = () => {
    // console.log('user' + user);
    if (!constructorItems.bun || orderRequest) return;
    if (!user) {
      navigate('/login', { replace: true, state: { from: location } });
      return;
    }
    dispatch(createOrder(burgerIngredients));
  };

  const closeOrderModal = () => {
    dispatch(clearIngredients());
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

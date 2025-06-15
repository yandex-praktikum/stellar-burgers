import { FC, useEffect, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector } from '../../services/store';
import {
  selectConstructorIems,
  selectOrderData,
  selectOrderRequest,
  selectOrderIngredients,
  selectUser
} from '@selectors';
import {
  clearOrderData,
  createOrder,
  fetchOrderBurger
} from '../../services/slices/orderSlice';
import { clearConstructorData } from '../../services/slices/constructorSlice';
import { useDispatch } from '../../services/store';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const constructorItems = useSelector(selectConstructorIems);
  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectOrderData);
  const orderIngredients = useSelector(selectOrderIngredients);
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const onOrderClick = () => {
    if (!constructorItems.bun) return;

    if (!user) {
      navigate('/login');
    } else {
      dispatch(createOrder(constructorItems));
    }
  };

  const closeOrderModal = () => {
    if (!orderRequest) {
      dispatch(clearOrderData());
      dispatch(clearConstructorData());
    }
  };

  useEffect(() => {
    if (orderIngredients.length > 0) {
      dispatch(fetchOrderBurger(orderIngredients));
    }
  }, [orderIngredients, dispatch]);

  const price = useMemo(() => {
    const bunPrice = constructorItems.bun ? constructorItems.bun.price * 2 : 0;
    const ingredientsTotal = constructorItems.ingredients.reduce(
      (s: number, v: TConstructorIngredient) => s + v.price,
      0
    );
    return bunPrice + ingredientsTotal;
  }, [constructorItems]);

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

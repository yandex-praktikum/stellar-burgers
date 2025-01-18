import { FC, useEffect, useMemo } from 'react';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  RootState,
  useDispatch,
  useSelector
} from '../../../src/services/store';
import {
  selectIsLoading,
  selectConstructorItems,
  closeModal,
  openModal,
  clearConstructor
} from '@slices';
import burgerSlice, {
  closeOrderModalAction,
  fetchOrderBurger,
  openOrderModalAction,
  selectModalOrderData,
  selectOrderRequest
} from '../../../src/services/slices/orderSlice';
import { useNavigate } from 'react-router-dom';
import { TUserState, selectUser } from '../../../src/services/slices/userSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const constructorItems: any = useSelector(selectConstructorItems);

  const orderRequest = useSelector(selectOrderRequest);

  const orderModalData = useSelector(selectModalOrderData);

  useEffect(() => {
    if (orderModalData?._id) dispatch(clearConstructor());
  }, [orderModalData]);

  const onOrderClick = () => {
    if (!user.name || !user.email) {
      navigate('/login');
      return;
    }
    if (!constructorItems.bun || orderRequest) return;
    dispatch(openOrderModalAction());
    dispatch(
      fetchOrderBurger([
        constructorItems.bun._id,
        constructorItems.bun._id,
        ...constructorItems.ingredients.map(
          (ingredient: TIngredient) => ingredient._id
        )
      ])
    );
  };
  const closeOrderModal = () => {
    dispatch(closeOrderModalAction());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun && constructorItems.bun.price
        ? constructorItems.bun.price * 2
        : 0) +
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

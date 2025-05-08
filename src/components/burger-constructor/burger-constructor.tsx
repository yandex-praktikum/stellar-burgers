import { FC, useMemo } from 'react';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import {
  clearBuilder,
  selectConstructorItems
} from '../../slices/builder-slice';
import { selectUserData } from '../../slices/user-slice';
import {
  closeOrderModalData,
  createOrder,
  selectOrderModalData,
  selectOrderRequest
} from '../../slices/order-slice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const constructorItems: {
  //   bun: TIngredient | null;
  //   ingredients: TConstructorIngredient[];
  // } = {
  //   bun: null,
  //   ingredients: []
  // };

  const constructorItems = useSelector(selectConstructorItems);
  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectOrderModalData);
  const user = useSelector(selectUserData);

  const onOrderClick = async () => {
    if (!constructorItems.bun || orderRequest) return;

    const order = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((ingredient) => ingredient._id),
      constructorItems.bun._id
    ];

    if (!user) {
      return navigate('/login');
    }

    try {
      await dispatch(createOrder(order));
      dispatch(clearBuilder());
    } catch (error) {
      console.error('Ошибка при отправке заказа:', error);
    }
  };

  const closeOrderModal = () => {
    dispatch(closeOrderModalData());
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

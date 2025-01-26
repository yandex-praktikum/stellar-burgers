import { FC, useEffect, useMemo } from 'react';
import { TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../../utils/cookie';
import { useSelector, useDispatch } from '../../services/store';
import {
  clearConstructor,
  constructorState
} from '../../services/constructorSlice';
import {
  clearOrders,
  orderBurgerThunk,
  selectOrderModalDataState,
  selectOrderRequestState
} from '../../services/orderSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const constructorItems = useSelector(constructorState);
  const orderRequest = useSelector(selectOrderRequestState);
  const orderModalData = useSelector(selectOrderModalDataState);

  useEffect(() => {
    if (orderModalData) dispatch(clearConstructor());
  }, [orderModalData]);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    const accessToken = getCookie('accessToken');

    if (accessToken) {
      const ingredientsIds = [
        constructorItems.bun?._id || '',
        ...constructorItems.ingredients.map((item) => item._id),
        constructorItems.bun?._id || ''
      ];

      dispatch(orderBurgerThunk(ingredientsIds));
    } else {
      return navigate('/login', { state: { form: '/' } });
    }
  };

  const closeOrderModal = () => {
    dispatch(clearOrders());

    navigate(-1);
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TIngredient) => s + v.price,
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

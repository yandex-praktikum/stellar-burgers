import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  burgerAssemblerSelector,
  clearburgerAssembler
} from '../../services/slices/burgetAssemblerSlice';
import {
  clearOrder,
  isOrderLoadingSelector,
  orderBurgerThunk,
  orderSelector
} from '../../services/slices/orderSlice';
import { isAuthCheckedSelector } from '../../services/slices/userSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector(burgerAssemblerSelector);
  const orderRequest = useSelector(isOrderLoadingSelector);
  const orderModalData = useSelector(orderSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector(isAuthCheckedSelector);

  const onOrderClick = () => {
    const handleNavigation = () => {
      if (!isAuth) {
        navigate('/login');
        return false;
      }
      return true;
    };

    const isOrderValid = () => {
      if (!constructorItems.bun || orderRequest) {
        return false;
      }
      return true;
    };

    if (handleNavigation() && isOrderValid()) {
      const { bun, ingredients } = constructorItems;
      if (!constructorItems.bun || orderRequest) return;
      const orderData: string[] = [
        bun?._id!,
        ...ingredients.map((ingredient) => ingredient._id),
        bun?._id!
      ];

      const createOrder = async () => {
        await dispatch(orderBurgerThunk(orderData));
        dispatch(clearburgerAssembler());
      };
      createOrder();
    }
  };

  const closeOrderModal = () => {
    navigate('/', { replace: true });
    dispatch(clearOrder());
    dispatch(clearburgerAssembler());
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

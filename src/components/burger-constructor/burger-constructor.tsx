import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { clearAll } from '../orderSlice';
import { orderSelector } from '../orderSlice';
import { useDispatch, useSelector } from '../../services/store';
import { newOrder, newOrderData, newOrderLoad, resetOrder } from '../newOrder';
import { useNavigate } from 'react-router-dom';
import { isAuthCheckedSelector } from '../userSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const constructorItems = useSelector(orderSelector.selectItems);
  const orderRequest = useSelector(newOrderLoad);
  const orderModalData = useSelector(newOrderData);
  const isAuthenticated = useSelector(isAuthCheckedSelector);

  const handleOrderClick = () => {
    if (!isAuthenticated) return navigate('/login');
    if (!constructorItems.bun || orderRequest) return;

    const orderData = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((ingredient) => ingredient._id)
    ];

    dispatch(newOrder(orderData));
  };

  const handleCloseOrderModal = () => {
    dispatch(resetOrder());
    dispatch(clearAll());
    navigate('/');
  };

  const totalPrice = useMemo(() => {
    const bunPrice = constructorItems.bun ? constructorItems.bun.price * 2 : 0;
    const ingredientsPrice = constructorItems.ingredients.reduce(
      (total, ingredient: TConstructorIngredient) => total + ingredient.price,
      0
    );
    return bunPrice + ingredientsPrice;
  }, [constructorItems]);

  return (
    <BurgerConstructorUI
      price={totalPrice}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={handleOrderClick}
      closeOrderModal={handleCloseOrderModal}
    />
  );
};

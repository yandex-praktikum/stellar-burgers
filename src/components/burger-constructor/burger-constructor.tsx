import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/store';
import { orderBurgerApiThunk } from '../../services/burgerConstructorSlice/thunk';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { resetOrder } from '../../services/burgerConstructorSlice/slice';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((store) => !!store.user.user);
  const { constructorItems, isRequesting, orderModalData } = useSelector(
    (store) => ({
      constructorItems: store.ingredients.constructorItems,
      isRequesting: store.ingredients.orderRequest.isRequesting,
      orderModalData: store.ingredients.orderRequest.orderModalData
    })
  );

  const onOrderClick = () => {
    if (!constructorItems.bun || isRequesting) return;

    if (!isLoggedIn) {
      return navigate('/login');
    }
    const order = constructorItems.ingredients
      .map(({ _id }) => _id)
      .concat([constructorItems.bun._id]);
    dispatch(orderBurgerApiThunk(order));
  };
  const closeOrderModal = () => {
    dispatch(resetOrder());
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
      orderRequest={isRequesting}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};

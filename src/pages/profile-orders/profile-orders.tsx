import { ProfileOrdersUI } from '@ui-pages';
import { TIngredient, TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { profileOrdersSelector } from '../../services/order/slice';
import { getOrders } from '../../services/order/action';
import { ingredientsSelector } from '../../services/ingredients/slice';
import { fetchIngredients } from '../../services/ingredients/action';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(profileOrdersSelector);
  const ingredients: TIngredient[] = useSelector(ingredientsSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!ingredients.length) {
      dispatch(fetchIngredients());
    }
    dispatch(getOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};

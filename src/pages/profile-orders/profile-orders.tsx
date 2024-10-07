import { ProfileOrdersUI } from '@ui-pages';
import { TIngredient, TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/store';
import {
  getOrders,
  profileOrdersSelector
} from '../../services/reducers/orders';
import {
  fetchIngredients,
  ingredientsSelector
} from '../../services/reducers/ingredients';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useAppSelector(profileOrdersSelector);
  const ingredients: TIngredient[] = useAppSelector(ingredientsSelector);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!ingredients.length) {
      dispatch(fetchIngredients());
    }
    dispatch(getOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};

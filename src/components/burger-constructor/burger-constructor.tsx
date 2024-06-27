import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearConstructor,
  selectAddedBunDetails,
  selectAddedIngredients
} from '../../Slices/constructorIngredientsSlice';
import {
  cleanConstructor,
  cleanOrderData,
  orderBurgerThunk,
  selectOrderData,
  selectOrderRequest
} from '../../Slices/orderBurgerSlice';
import { AppDispatch } from 'src/services/store';
import { useNavigate } from 'react-router-dom';
import { selectUserData } from '../../Slices/userSlice';

type TconstructorItems = {
  bun: TBun | null;
  ingredients: TConstructorIngredient[];
};

type TBun = {
  price: number;
};

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const addedIngredients = useSelector(selectAddedIngredients);
  const addedBunDetails = useSelector(selectAddedBunDetails);
  const user = useSelector(selectUserData);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const constructorItems: TconstructorItems = {
    bun: addedBunDetails,
    ingredients: addedIngredients
  };

  const orderRequest = useSelector(selectOrderRequest);

  const orderModalData = useSelector(selectOrderData);

  const onOrderClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!constructorItems.bun || orderRequest) return;
    const idIngredients = addedIngredients.map((ingredient) => ingredient._id);
    const bun = addedBunDetails?._id;
    if (bun) {
      idIngredients.push(bun, bun);
    }
    dispatch(orderBurgerThunk(idIngredients)).then(() => {
      dispatch(cleanConstructor());
      dispatch(clearConstructor());
    });
  };
  const closeOrderModal = () => {
    dispatch(cleanOrderData());
    navigate('/');
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

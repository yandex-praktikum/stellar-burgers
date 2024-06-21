import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector } from 'react-redux';
import {
  selectAddedBunDetails,
  selectAddedIngredients
} from '../../Slices/constructorIngredientsSlice';

// export const BurgerConstructor: FC = () =>
// const onOrderClick = () => {
// if (!user) {
//   navigate('/login');
//   return;
// }
// if (!constructorItems.bun || orderRequest) return;
// };
// const closeOrderModal = () => {};

// const price = useMemo(
//   () =>
//     (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
//     constructorItems.ingredients.reduce(
//       (s: number, v: TConstructorIngredient) => s + v.price,
//       0
//     ),
//   [constructorItems]
// );

// return (
//   <BurgerConstructorUI
//     price={price}
//     orderRequest={orderRequest}
//     constructorItems={constructorItems}
//     orderModalData={orderModalData}
//     onOrderClick={onOrderClick}
//     closeOrderModal={closeOrderModal}
//   />
// );

// null;

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
  // const addedBun = useSelector(selectAddedBun)
  const addedBunDetails = useSelector(selectAddedBunDetails);

  const constructorItems: TconstructorItems = {
    bun: addedBunDetails,
    ingredients: addedIngredients
  };

  const orderRequest = false;

  const orderModalData = null;

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
  };
  const closeOrderModal = () => {};

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

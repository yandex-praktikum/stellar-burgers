import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI, Preloader } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import {
  getConstructorItems,
  getOrderRequest,
  getOrderModalData,
  createOrder,
  clearOrder
} from '../../services/slices/BurgerConstructorSlice';
import {
  selectUser,
  selectIsAuthChecked,
  selectIsAuthenticated,
  checkUserAuth
} from '../../services/slices/UserInfoSlice';

// Компонент, отвечающий за работу конструктора бургера
export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const constructorItems = useSelector(getConstructorItems); // Получаем ингредиенты конструктора из Redux
  const orderRequest = useSelector(getOrderRequest); // Получаем статус запроса создания заказа из Redux
  const orderModalData = useSelector(getOrderModalData); // Получаем данные для модального окна заказа из Redux
  const authorized = useSelector(selectIsAuthenticated); // Проверяем, авторизован ли пользователь

  // Обработчик нажатия на кнопку "Оформить заказ"
  const onOrderClick = () => {
    if (!authorized) {
      return navigate('/login');
    }
    if (!constructorItems.bun || orderRequest) return;

    // Формируем массив ингредиентов для заказа
    const order = [
      constructorItems.bun?._id,
      ...constructorItems.ingredients.map((ingredient) => ingredient._id),
      constructorItems.bun?._id
    ].filter(Boolean); // Фильтруем, чтобы убрать потенциальные undefined значения

    dispatch(createOrder(order));
  };

  // Обработчик закрытия модального окна заказа
  const closeOrderModal = () => {
    dispatch(clearOrder());
    navigate('/');
  };

  // Подсчитываем общую стоимость заказа с использованием useMemo для оптимизации
  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems] //Вычисление перезапускается только при изменении состава конструктора
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

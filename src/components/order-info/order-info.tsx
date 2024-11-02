import { FC, useMemo, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { Modal } from '../modal';
import { useSelector, useDispatch } from '../../services/store';
import { fetchIngredients } from '../../services/burgerConstructorSlice/thunk';
import { getFeedsThunk } from '../../services/ordersSlice/thunk';
import styles from '../ui/modal/modal.module.css';

export const OrderInfo: FC = () => {
  const { number } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const orderData = useSelector((store) =>
    store.orders.feeds.orders.find((order) => order.number === Number(number))
  );

  const ingredients = useSelector((store) => store.ingredients.ingredients);

  useEffect(() => {
    if (!orderData) {
      dispatch(getFeedsThunk());
    }

    if (!ingredients.length) {
      dispatch(fetchIngredients());
    }
  }, []);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  if (!location.state) {
    return (
      <>
        <div className={styles.pageView}>
          <h1 className='text text_type_main-medium mt-2 mb-4'>
            {`#${orderData?.number}`}
          </h1>
          <OrderInfoUI orderInfo={orderInfo} />
        </div>
      </>
    );
  }

  return (
    <Modal title={`#${orderData?.number}`} onClose={() => navigate(-1)}>
      <OrderInfoUI orderInfo={orderInfo} />
    </Modal>
  );
};

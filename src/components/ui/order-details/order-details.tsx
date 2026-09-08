import doneImg from '@/images/done.svg';

import type { OrderDetailsUIProps } from './type';
import type React from 'react';

import styles from './order-details.module.css';

export const OrderDetailsUI = ({
  orderNumber,
}: OrderDetailsUIProps): React.JSX.Element => (
  <>
    <h2
      className={`${styles.title} text text_type_digits-large mt-2 mb-4`}
      data-testid="order-number"
    >
      {orderNumber}
    </h2>
    <p className="text text_type_main-medium">идентификатор заказа</p>
    <img className={styles.img} src={doneImg} alt="изображение статуса заказа." />
    <p className="text text_type_main-default mb-1">Ваш заказ начали готовить</p>
    <p className={`${styles.text} text text_type_main-default`}>
      Дождитесь готовности на орбитальной станции
    </p>
  </>
);

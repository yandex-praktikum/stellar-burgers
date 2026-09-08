import { OrderStatus } from '@components';
import {
  CurrencyIcon,
  FormattedDate,
} from '@krgaa/react-developer-burger-ui-components';
import { memo } from 'react';
import { Link } from 'react-router-dom';

import type { OrderCardUIProps } from './type';

import styles from './order-card.module.css';

export const OrderCardUI = memo(function OrderCardUI({
  orderInfo,
  maxIngredients,
  locationState,
}: OrderCardUIProps): React.JSX.Element {
  return (
    <Link
      to={orderInfo.number.toString()}
      relative="path"
      state={locationState}
      className={`p-6 mb-4 mr-2 ${styles.order}`}
    >
      <div className={styles.order_info}>
        <span className="text text_type_digits-default">
          #{String(orderInfo.number).padStart(6, '0')}
        </span>
        <span className="text text_type_main-default text_color_inactive">
          <FormattedDate date={orderInfo.date} />
        </span>
      </div>
      <h4 className={`pt-6 text text_type_main-medium ${styles.order_name}`}>
        {orderInfo.name}
      </h4>
      {location.pathname === '/profile/orders' && (
        <OrderStatus status={orderInfo.status} />
      )}
      <div className={`pt-6 ${styles.order_content}`}>
        <ul className={styles.ingredients}>
          {orderInfo.ingredientsToShow.map((ingredient, index) => {
            const zIndex = maxIngredients - index;
            const right = 20 * index;
            return (
              <li
                className={styles.img_wrap}
                style={{ zIndex: zIndex, right: right }}
                key={index}
              >
                <img
                  style={{
                    opacity:
                      orderInfo.remains && maxIngredients === index + 1 ? '0.5' : '1',
                  }}
                  className={styles.img}
                  src={ingredient.image_mobile}
                  alt={ingredient.name}
                />
                {maxIngredients === index + 1 ? (
                  <span className={`text text_type_digits-default ${styles.remains}`}>
                    {orderInfo.remains > 0 ? `+${orderInfo.remains}` : null}
                  </span>
                ) : null}
              </li>
            );
          })}
        </ul>
        <div>
          <span className={`text text_type_digits-default pr-1 ${styles.order_total}`}>
            {orderInfo.total}
          </span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </Link>
  );
});

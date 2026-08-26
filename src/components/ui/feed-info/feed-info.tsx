import { memo } from 'react';

import type { FeedInfoUIProps, HalfColumnProps, TColumnProps } from './type';

import styles from './feed-info.module.css';

export const FeedInfoUI = memo(function FeedInfoUI({
  feed,
  readyOrders,
  pendingOrders,
}: FeedInfoUIProps): React.JSX.Element {
  const { total, totalToday } = feed;

  return (
    <section>
      <div className={styles.columns}>
        <HalfColumn orders={readyOrders} title={'Готовы'} textColor={'blue'} />
        <HalfColumn orders={pendingOrders} title={'В работе'} />
      </div>
      <Column title={'Выполнено за все время'} content={total} />
      <Column title={'Выполнено за сегодня'} content={totalToday} />
    </section>
  );
});

const HalfColumn = ({
  orders,
  title,
  textColor,
}: HalfColumnProps): React.JSX.Element => (
  <div className={`pr-6 ${styles.column}`}>
    <h3 className={`text text_type_main-medium ${styles.title}`}>{title}:</h3>
    <ul className={`pt-6  ${styles.list}`}>
      {orders.map((item, index) => (
        <li
          className={`text text_type_digits-default ${styles.list_item}`}
          style={{ color: textColor === 'blue' ? '#00cccc' : '#F2F2F3' }}
          key={index}
        >
          {item}
        </li>
      ))}
    </ul>
  </div>
);

const Column = ({ title, content }: TColumnProps): React.JSX.Element => (
  <>
    <h3 className={`pt-15 text text_type_main-medium ${styles.title}`}>{title}:</h3>
    <p className={`text text_type_digits-large ${styles.content}`}>{content}</p>
  </>
);

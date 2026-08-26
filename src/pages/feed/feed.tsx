import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';

import type { TOrder } from '@utils-types';

export const Feed = (): React.JSX.Element => {
  // TODO: Взять переменную из стора
  const orders: TOrder[] = [];

  const handleGetFeeds = (): void => {
    // TODO: Запросить ленту заказов
  };

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};

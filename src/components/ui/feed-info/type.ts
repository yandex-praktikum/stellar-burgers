import { TFeed } from '@utils-types';

export type TFeedInfoUI = {
  feed: TFeed;
  readyOrders: number[];
  pendingOrders: number[];
};

export type THalfColumn = {
  orders: number[];
  title: string;
  textColor?: string;
};

export type TColumnProps = {
  title: string;
  content: number;
};

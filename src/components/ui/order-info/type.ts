import { TIngredient } from '@utils-types';

export type OrderInfoUIProps = {
  orderInfo: TOrderInfo;
  isModal?: boolean;
};

type TOrderInfo = {
  ingredientsInfo: {
    [key: string]: TIngredient & { count: number };
  };
  date: Date;
  total: number;
  _id: string;
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  ingredients: string[];
};

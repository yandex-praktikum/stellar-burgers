export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_large: string;
  image_mobile: string;
};

export type TConstructorIngredient = TIngredient & {
  id: string;
};

export type TOrder = {
  _id: string;
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  ingredients: string[];
};

export type TOrdersData = {
  orders: TOrder[];
  total: number;
  totalToday: number;
};

// Интерфейс для состояния заказов
export interface IOrdersState {
  feed: TOrdersData;
  usersOrders: TOrdersData;
  selectedOrder: TOrder | null;
  isLoadingSelectedOrder: boolean;
  justCreatedOrder: TOrder | null;
  isLoading: boolean;
  error: string | null;
}

export type TUser = {
  email: string;
  name: string;
};

export interface IUserState {
  isLoading: boolean;
  isChecked: boolean;
  user: TUser | null;
  error: string | null;
}

export type TTabMode = 'bun' | 'sauce' | 'main';

// Интерфейс для состояния ингридиентов
export interface IIngredientsState {
  ingredients: TIngredient[];
  selectedIngredient: TIngredient | null;
  loading: boolean;
  error: string | null;
}

export type TConstructorItems = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

// Интерфейс для состояния конструктора
export interface IConstructorState {
  constructorItems: TConstructorItems;
}

export interface IProtectedRouteProps {
  isProtected?: boolean; // Флаг для проверки необходимости авторизации
}

export interface IApiError {
  status: number;
  message: string;
}

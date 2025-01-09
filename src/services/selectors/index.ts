import { userSlice } from '../slices';
import { burgerSlice } from '../slices/burger-slice';

export const {
  getIngredients,
  getConstructorItems,
  getFeed,
  getOrderRequest,
  getOrderModalData
} = burgerSlice.selectors;
export const { getUser, getIsAuthChecked, getOrders } = userSlice.selectors;

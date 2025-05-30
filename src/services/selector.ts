import { RootState } from './store';

//селектор  принимает номер заказа (number) и возвращает функцию, которая принимает состояние приложения state (типа RootState). Эта функция затем выполняет поиск заказа с указанным номером в различных частях состояния и возвращает найденный заказ или null, если заказ не найден.

export const selectOrderById = (number: number) => (state: RootState) => {
  //проверка на длину массива
  if (state.feeddata.orders.length || state.ordershistory.orders.length) {
    return (
      //селектор пытается найти заказ с указанным номером в state.feeddata.orders. Если такой заказ найден - он возвращается
      state.feeddata.orders.find((order) => order.number === number) ||
      state.ordershistory.orders.find((order) => order.number === number) //Если не найден, селектор ищет заказ с таким же номером в state.ordershistory.orders и, если находит, возвращает его
    );
  }
  //Если массивы заказов пусты или заказ не найден, но существует modalOrder в state.feeddata, селектор проверяет, совпадает ли его номер с указанным number. Если совпадает, то возвращается modalOrder. Если не совпадает — возвращается null.
  if (state.feeddata.modalOrder) {
    return state.feeddata.modalOrder.number === number
      ? state.feeddata.modalOrder
      : null;
  }
  return null; //Если ни одно из предыдущих условий не сработало, функция возвращает null, что означает, что заказ с указанным номером не найден.
};

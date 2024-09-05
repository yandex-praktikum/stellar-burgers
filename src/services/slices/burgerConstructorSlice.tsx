import { createSlice, PayloadAction } from '@reduxjs/toolkit'; // Импортируем функции для создания среза и тип PayloadAction из Redux Toolkit
import { TConstructorIngredient, TIngredient } from '@utils-types'; // Импортируем тип для ингредиентов конструктора бургера
import { nanoid } from '@reduxjs/toolkit'; // Импортируем функцию для генерации уникальных идентификаторов

// Определяем интерфейс состояния конструктора бургера
interface BurgerConstructorState {
  bun: TConstructorIngredient | null; // Булочка, может быть null, если не выбрана
  ingredients: TConstructorIngredient[]; // Массив ингредиентов
}

// Начальное состояние конструктора бургера
const initialState: BurgerConstructorState = {
  bun: null, // Начально булочка отсутствует
  ingredients: [] // Начально нет ингредиентов
};

// Создаем срез состояния для конструктора бургера
export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor', // Имя среза
  initialState, // Начальное состояние
  reducers: {
    // Редьюсеры для изменения состояния
    addIngredient: {
      // Добавление ингредиента
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        // Редьюсер для добавления ингредиента
        if (action.payload.type === 'bun') {
          // Проверяем, является ли ингредиент булочкой
          state.bun = action.payload; // Устанавливаем булочку в состояние
        } else {
          state.ingredients.push(action.payload); // Добавляем ингредиент в массив, если это не булочка
        }
      },
      prepare: (ingredient: TIngredient) => {
        // Подготовка действия перед его отправкой
        const id = nanoid(); // Генерируем уникальный идентификатор для ингредиента
        return { payload: { ...ingredient, id } }; // Возвращаем объект с ингредиентом и его идентификатором
      }
    },
    deleteIngredient: (state, action) => {
      // Удаление ингредиента по идентификатору
      state.ingredients = state.ingredients.filter(
        // Фильтруем массив ингредиентов
        (ingredient) => ingredient.id !== action.payload // Удаляем ингредиент с указанным идентификатором
      );
    },
    moveIngredient: (
      // Перемещение ингредиента
      state,
      action: PayloadAction<{ from: number; to: number }> // Действие с указанием индексов перемещения
    ) => {
      const { from, to } = action.payload; // Извлекаем индексы из действия
      const ingredients = [...state.ingredients]; // Копируем массив ингредиентов
      ingredients.splice(to, 0, ingredients.splice(from, 1)[0]); // Перемещаем ингредиент в новый индекс
      state.ingredients = ingredients; // Обновляем массив ингредиентов в состоянии
    },
    emptyConstructor: (state) => {
      // Очистка конструктора
      state.bun = null; // Сбрасываем булочку
      state.ingredients = []; // Очищаем массив ингредиентов
    }
    // setOrderRequest: (state, action: PayloadAction<boolean>) => { // Устанавливаем состояние запроса заказа
    //   state.orderRequest = action.payload; // Обновляем флаг запроса заказа
    // },
    // setOrderModalData: (state, action: PayloadAction<any>) => { // Устанавливаем данные для модального окна заказа
    //   state.orderModalData = action.payload; // Обновляем данные модального окна
    // }
  },
  selectors: {
    // Селекторы для получения состояния
    selectConstructorItem: (state) => state // Возвращаем текущее состояние конструктора
  }
});

// Экспортируем действия редьюсера для использования в других частях приложения
export const {
  addIngredient,
  deleteIngredient,
  moveIngredient,
  emptyConstructor
  // setOrderRequest,
  // setOrderModalData
} = burgerConstructorSlice.actions;

// Экспортируем селектор для получения состояния конструктора
export const { selectConstructorItem } = burgerConstructorSlice.selectors;

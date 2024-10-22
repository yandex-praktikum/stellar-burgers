// Определяет тип ингредиента  
export type TIngredient = {  
  _id: string;                   // Уникальный идентификатор ингредиента  
  name: string;                  // Название ингредиента  
  type: string;                  // Тип ингредиента (например, "bun", "sauce", "main")  
  proteins: number;              // Количество белков  
  fat: number;                   // Количество жиров  
  carbohydrates: number;         // Количество углеводов  
  calories: number;              // Калорийность  
  price: number;                 // Цена  
  image: string;                 // URL изображения  
  image_large: string;           // URL большого изображения  
  image_mobile: string;          // URL мобильного изображения  
};  

// Определяет тип ингредиента для конструктора  
export type TConstructorIngredient = TIngredient & {  
  id: string;                   // Уникальный идентификатор для конструктора  
};  

// Определяет тип заказа  
export type TOrder = {  
  _id: string;                   // Уникальный идентификатор заказа  
  status: string;                // Статус заказа (например, "done", "pending")  
  name: string;                  // Название заказа  
  createdAt: string;             // Дата создания заказа  
  updatedAt: string;             // Дата обновления заказа  
  number: number;                // Номер заказа  
  ingredients: string[];         // Массив идентификаторов ингредиентов  
};  

// Определяет тип данных заказов  
export type TOrdersData = {  
  orders: TOrder[];              // Массив заказов  
  total: number;                 // Общее количество заказов  
  totalToday: number;            // Количество заказов за сегодня  
};  

// Определяет тип пользователя  
export type TUser = {  
  email: string;                 // Email пользователя  
  name: string;                  // Имя пользователя  
  password?: string;             // Пароль пользователя (необязательный)  
};  

// Определяет тип данных для регистрации  
export type TRegisterData = {  
  email: string;                 // Email пользователя  
  name: string;                  // Имя пользователя  
  password: string;              // Пароль пользователя (обязательный)  
  confirmPassword?: string;      // Подтверждение пароля (необязательный)  
};  

// Определяет тип режима вкладки  
export type TTabMode = 'bun' | 'sauce' | 'main'; // Возможные режимы вкладок
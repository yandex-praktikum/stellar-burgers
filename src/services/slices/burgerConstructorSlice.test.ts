import { burgerConstructorSlice, addIngredientToConstructor, deleteIngredientFromConstructor, moveIngredientInConstructor, clearConstructor } from './burgerConstructorSlice';  
import { TConstructorIngredient } from '@utils-types';  

const bunIngredient: TConstructorIngredient = {  
  _id: '1',  
  id: '1',  
  name: 'Булка',  
  type: 'bun',  
  proteins: 10,  
  fat: 20,  
  carbohydrates: 30,  
  calories: 200,  
  price: 100,  
  image: 'image.jpg',  
  image_mobile: 'image_mobile.jpg',  
  image_large: 'image_large.jpg',  
};  

const fillingIngredient: TConstructorIngredient = {  
  _id: '2',  
  id: '2',  
  name: 'Начинка',  
  type: 'filling',  
  proteins: 10,  
  fat: 15,  
  carbohydrates: 20,  
  calories: 150,  
  price: 50,  
  image: 'image.jpg',  
  image_mobile: 'image_mobile.jpg',  
  image_large: 'image_large.jpg',  
};  

describe('burgerConstructorSlice', () => {  
  const initialState = {  
    bun: null,  
    ingredients: [] as TConstructorIngredient[],  
  };  

  test('добавляет булку в конструктор', () => {  
    const action = addIngredientToConstructor(bunIngredient);  
    const state = burgerConstructorSlice.reducer(initialState, action);  
    expect(state.bun).toEqual(bunIngredient);  
  });  

  test('добавляет начинку в конструктор', () => {  
    const action = addIngredientToConstructor(fillingIngredient);  
    const state = burgerConstructorSlice.reducer(initialState, action);  
    expect(state.ingredients).toHaveLength(1);  
    expect(state.ingredients[0]).toEqual(fillingIngredient);  
  });  

  test('удаляет ингредиент из конструктора', () => {  
    const stateWithIngredient = {  
      bun: null,  
      ingredients: [fillingIngredient]  
    };  
    const action = deleteIngredientFromConstructor('2');  
    const state = burgerConstructorSlice.reducer(stateWithIngredient, action);  
    expect(state.ingredients).toHaveLength(0);  
  });  

  test('перемещает ингредиент в конструкторе', () => {  
    const stateWithIngredients = {  
      bun: null,  
      ingredients: [  
        { ...fillingIngredient, id: '1', name: 'Начинка 1' },  
        { ...fillingIngredient, id: '2', name: 'Начинка 2' }  
      ]  
    };  
    const action = moveIngredientInConstructor({ from: 0, to: 1 });  
    const state = burgerConstructorSlice.reducer(stateWithIngredients, action);  

    expect(state.ingredients[0].name).toBe('Начинка 2');  
    expect(state.ingredients[1].name).toBe('Начинка 1');  
  });  

  test('очищает конструктор', () => {  
    const stateWithIngredients = {  
      bun: bunIngredient,  
      ingredients: [fillingIngredient]  
    };  
    const action = clearConstructor();  
    const state = burgerConstructorSlice.reducer(stateWithIngredients, action);  

    expect(state.ingredients).toHaveLength(0);  
    expect(state.bun).toBeNull();  
  });  
});

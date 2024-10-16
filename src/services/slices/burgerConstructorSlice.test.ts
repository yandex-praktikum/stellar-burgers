import { burgerConstructorSlice, addIngredientToConstructor, deleteIngredientFromConstructor, moveIngredientInConstructor, clearConstructor } from './burgerConstructorSlice';
import { TConstructorIngredient } from '@utils-types'; // Убедись, что типы импортишь правильно

// Полные данные для тестов в соответствии с TIngredient и TConstructorIngredient
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
    ingredients: [] as TConstructorIngredient[], // Указание типа
  };

  it('добавляет булку в конструктор', () => {
    const action = addIngredientToConstructor(bunIngredient);
    const state = burgerConstructorSlice.reducer(initialState, action);
    
    // Используй correct assertion method для своей библиотеки
    expect(state.bun).to.deep.equal(bunIngredient);
  });

  it('добавляет начинку в конструктор', () => {
    const action = addIngredientToConstructor(fillingIngredient);
    const state = burgerConstructorSlice.reducer(initialState, action);
    
    // Используем .deep.equal для сравнения объектов
    expect(state.ingredients).to.have.lengthOf(1);
    expect(state.ingredients[0]).to.deep.equal(fillingIngredient);
  });

  it('удаляет ингредиент из конструктора', () => {
    const stateWithIngredient = {
      bun: null,
      ingredients: [fillingIngredient]
    };
    const action = deleteIngredientFromConstructor('2');
    const state = burgerConstructorSlice.reducer(stateWithIngredient, action);
    expect(state.ingredients).to.have.lengthOf(0);
  });

  it('перемещает ингредиент в конструкторе', () => {
    const stateWithIngredients = {
      bun: null,
      ingredients: [
        { ...fillingIngredient, id: '1', name: 'Начинка 1' },
        { ...fillingIngredient, id: '2', name: 'Начинка 2' }
      ]
    };
    const action = moveIngredientInConstructor({ from: 0, to: 1 });
    const state = burgerConstructorSlice.reducer(stateWithIngredients, action);

    // Проверяем, что ингредиенты поменялись местами
    expect(state.ingredients[0].name).to.equal('Начинка 2');
    expect(state.ingredients[1].name).to.equal('Начинка 1');
  });

  it('очищает конструктор', () => {
    const stateWithIngredients = {
      bun: bunIngredient,
      ingredients: [fillingIngredient]
    };
    const action = clearConstructor();
    const state = burgerConstructorSlice.reducer(stateWithIngredients, action);

    // Проверяем, что конструктор очищен
    expect(state.ingredients).to.have.lengthOf(0);
    expect(state.bun).to.be.null;
  });
});

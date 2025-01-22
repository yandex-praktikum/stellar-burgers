import store, { rootReducer } from '../../store';

describe('Тестирование rootReducer', () => {
  test('Вызов rootReducer с UNKNOWN_ACTION и undefined возвращает начальное состояние хранилища', () => {
    // Получаем начальное состояние хранилища
    const initialState = store.getState();

    // Вызываем rootReducer с undefined (начальное состояние) и неизвестным действием
    const resultState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    // Проверяем, что результат равен начальному состоянию
    expect(resultState).toEqual(initialState);
  });

  test('Вызов rootReducer с UNKNOWN_ACTION и текущим состоянием возвращает текущее состояние', () => {
    // Получаем текущее состояние хранилища
    const currentState = store.getState();

    // Вызываем rootReducer с текущим состоянием и неизвестным действием
    const resultState = rootReducer(currentState, { type: 'UNKNOWN_ACTION' });

    // Проверяем, что результат равен текущему состоянию
    expect(resultState).toEqual(currentState);
  });
});

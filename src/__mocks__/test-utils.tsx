import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';

import userReducer from '../services/slices/userSlice';
import ingredientsReducer from '../services/slices/ingredientsSlice';
import ordersReducer from '../services/slices/ordersSlice';
import burgerConstructorReducer from '../services/slices/burgerConstructorSlice';
import { RootState } from '../services/store';

const rootReducer = combineReducers({
  user: userReducer,
  ingredients: ingredientsReducer,
  orders: ordersReducer,
  burgerConstructor: burgerConstructorReducer
});

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
}

export function renderWithProviders(
  ui: ReactElement,
  { preloadedState = {}, ...renderOptions }: ExtendedRenderOptions = {}
) {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: preloadedState as any
  });

  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export * from '@testing-library/react';
export { renderWithProviders as render };

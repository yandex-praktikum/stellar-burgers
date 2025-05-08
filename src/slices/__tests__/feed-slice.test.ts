import { configureStore } from '@reduxjs/toolkit';
import feedSlice, {
  feedThunk,
  selectFeed,
  selectLoading,
  selectError,
  selectOrders,
  initialState
} from '../feed-slice';
import { TOrdersData, TOrder } from '@utils-types';
import { getFeedsApi } from '@api';

// Мок для API
jest.mock('@api', () => ({
  getFeedsApi: jest.fn()
}));

const mockedGetFeedsApi = getFeedsApi as jest.MockedFunction<
  typeof getFeedsApi
>;

describe('Слайс feed', () => {
  const mockOrder: TOrder = {
    _id: '1',
    status: 'done',
    ingredients: ['ing1', 'ing2'],
    createdAt: 'date',
    updatedAt: 'date',
    number: 1,
    name: 'Order 1'
  };

  const mockOrdersData: TOrdersData = {
    orders: [mockOrder],
    total: 100,
    totalToday: 10
  };

  const mockApiResponse = {
    ...mockOrdersData,
    success: true
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Возвращает начальное состояние', () => {
    expect(feedSlice(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('feedThunk', () => {
    it('Обрабатывает состояние pending', () => {
      const action = { type: feedThunk.pending.type };
      const state = feedSlice(initialState, action);
      expect(state).toEqual({
        ...initialState,
        loading: true
      });
    });

    it('Обрабатывает состояние fulfilled', () => {
      const action = {
        type: feedThunk.fulfilled.type,
        payload: mockApiResponse
      };
      const state = feedSlice(initialState, action);
      expect(state).toEqual({
        ...initialState,
        items: mockApiResponse,
        loading: false
      });
    });

    it('Обрабатывает состояние rejected', () => {
      const error = { message: 'Request failed' };
      const action = { type: feedThunk.rejected.type, error };
      const state = feedSlice(initialState, action);
      expect(state).toEqual({
        ...initialState,
        loading: false,
        error
      });
    });

    it('Успешная загрузка данных о ленте заказов', async () => {
      mockedGetFeedsApi.mockResolvedValue(mockApiResponse);

      const store = configureStore({
        reducer: {
          feed: feedSlice
        }
      });

      await store.dispatch(feedThunk());

      const state = store.getState().feed;
      expect(state.items).toEqual(mockApiResponse);
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
    });

    it('Обрабатывает ошибку при загрузке данных о ленте заказов', async () => {
      const errorMessage = 'Network Error';
      mockedGetFeedsApi.mockRejectedValue(new Error(errorMessage));

      const store = configureStore({
        reducer: {
          feed: feedSlice
        }
      });

      await store.dispatch(feedThunk());

      const state = store.getState().feed;
      expect(state.items).toBeNull();
      expect(state.loading).toBe(false);
      expect(state.error?.message).toEqual(errorMessage);
    });
  });

  describe('Селекторы', () => {
    const mockRootState = {
      feed: {
        items: mockApiResponse,
        loading: false,
        error: null
      },
      builder: {} as any,
      ingredients: {} as any,
      order: {} as any,
      user: {} as any
    };

    const mockErrorRootState = {
      feed: {
        items: null,
        loading: false,
        error: { message: 'Error' }
      },
      builder: {} as any,
      ingredients: {} as any,
      order: {} as any,
      user: {} as any
    };

    it('Выбирает элементы ленты заказов', () => {
      expect(selectFeed(mockRootState)).toEqual(mockApiResponse);
    });

    it('Выбирает состояние загрузки', () => {
      expect(selectLoading(mockRootState)).toBe(false);
    });

    it('Выбирает состояние ошибки', () => {
      expect(selectError(mockRootState)).toBeNull();
      expect(selectError(mockErrorRootState)).toEqual({ message: 'Error' });
    });

    it('Выбирает заказы', () => {
      expect(selectOrders(mockRootState)).toEqual(mockApiResponse.orders);
      expect(
        selectOrders({
          ...mockRootState,
          feed: { ...initialState }
        })
      ).toEqual([]);
    });
  });
});

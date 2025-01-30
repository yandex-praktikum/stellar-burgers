import userReducer, { loginUser } from '../user-slice'

describe('user reducer', () => {
  const initialState = {
    user: null,
    isLoading: false,
    isChecked: false,
    error: null
  }

  const mockUser = {
    email: 'test@test.com',
    name: 'Test User'
  }

  it('должен устанавливать loading в true при начале запроса', () => {
    const state = userReducer(initialState, {
      type: loginUser.pending.type
    })

    expect(state.isLoading).toBe(true)
    expect(state.error).toBeNull()
  })

  it('должен сохранять данные пользователя при успешном запросе', () => {
    const state = userReducer(initialState, {
      type: loginUser.fulfilled.type,
      payload: mockUser
    })

    expect(state.user).toEqual(mockUser)
    expect(state.isLoading).toBe(false)
    expect(state.error).toBeNull()
  })

  it('должен сохранять ошибку при неуспешном запросе', () => {
    const errorMessage = 'Failed to login'

    const state = userReducer(initialState, {
      type: loginUser.rejected.type,
      payload: errorMessage
    })

    expect(state.error).toBe(errorMessage)
    expect(state.isLoading).toBe(false)
    expect(state.user).toBeNull()
  })
}) 
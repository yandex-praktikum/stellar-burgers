import { combineReducers } from 'redux'
import { ingredientsSliceReducer } from '../slices/ingredientsSlice'

export const rootReducer = () => combineReducers ({
ingredients: ingredientsSliceReducer

})

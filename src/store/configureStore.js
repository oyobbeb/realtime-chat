import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { messageReducer } from '../features/reducers/message';

const rootReducer = combineReducers({
  message: messageReducer.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
});

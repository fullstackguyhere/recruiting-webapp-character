import { configureStore } from '@reduxjs/toolkit';
import characterReducer from './reducers';

const store = configureStore({
  reducer: characterReducer,
});

export default store;

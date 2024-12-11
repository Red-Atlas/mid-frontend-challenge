import { combineReducers, configureStore } from '@reduxjs/toolkit';
import propertiesSlice from './reducers/propertiesSlice';

const rootReducer = combineReducers({
  properties: propertiesSlice
});

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export type RootState = ReturnType<typeof rootReducer>;
export default store;
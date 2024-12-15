import { combineReducers, configureStore } from '@reduxjs/toolkit';
import propertiesSlice from './reducers/propertiesSlice';
import snackbarSlice from './reducers/snackbarSlice';

const rootReducer = combineReducers({
  properties: propertiesSlice,
  snackbar: snackbarSlice,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export type RootState = ReturnType<typeof rootReducer>;
export default store;
import { createSlice } from '@reduxjs/toolkit';
import { PropertyStatusInterface } from '../interfaces/properties.interface';

const propertiesSlice = createSlice({
  name: 'property',
  initialState: {
    property: [],
  } as PropertyStatusInterface,
  reducers: {
    setPropertySlice: (state, action) => {
      state.property = action.payload;
    },
    clearPropertySlice: (state) => {
      state.property = [];
    },
  },
});

export const { setPropertySlice, clearPropertySlice } = propertiesSlice.actions;
export default propertiesSlice.reducer;
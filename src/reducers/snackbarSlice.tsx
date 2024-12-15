// redux/snackbarSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import SnacbkarProps from '../interfaces/snackbar.interface';


const initialState: SnacbkarProps = {
  open: false,
  message: '',
  severity: 'success',
  autoHideDuration: 6000
};

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    showSnackbar(state, action: PayloadAction<Partial<SnacbkarProps>>) {
      state.open = true;
      state.message = action.payload.message ?? '';
      state.severity = action.payload.severity ?? 'success';
      state.autoHideDuration = action.payload.autoHideDuration ?? 6000;
    },
    hideSnackbar(state) {
      state.open = false;
    },
  },
});

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;

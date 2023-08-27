import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ControledState {
  isAuthenticated: boolean;
}

const initialState: ControledState = {
  isAuthenticated: false,
};

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setIsAuthenticated } = authenticationSlice.actions;

export default authenticationSlice.reducer;

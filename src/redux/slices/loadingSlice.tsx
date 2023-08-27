import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface loadedState {
  isLoaded: boolean;
}

const initialState: loadedState = {
  isLoaded: false,
};

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setIsLoaded: (state, action: PayloadAction<boolean>) => {
      state.isLoaded = action.payload;
    },
  },
});

export const { setIsLoaded } = loadingSlice.actions;

export default loadingSlice.reducer;

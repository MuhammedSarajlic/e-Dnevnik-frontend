import { configureStore } from '@reduxjs/toolkit';
import authenticationSliceReducer from './slices/authenticationSlice';
import loadingSliceReducer from './slices/LoadingSlice';

export const store = configureStore({
  reducer: {
    authentication: authenticationSliceReducer,
    loading: loadingSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './features/profile/profileSlice';

export const store = configureStore({
  reducer: {
    profiles: profileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

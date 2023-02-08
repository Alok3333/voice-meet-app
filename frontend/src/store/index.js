import { configureStore } from '@reduxjs/toolkit';
import auth from '../store/authSlice';
import activate from '../store/activateSlice';

export const store = configureStore({
  reducer: {
    auth,
    activate,
  },
});

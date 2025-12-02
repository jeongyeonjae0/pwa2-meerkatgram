import { configureStore } from "@reduxjs/toolkit";
import postIndexReducer from './slices/postIndexSlice.js';
import authReducer from './slices/authSlice.js';

export default configureStore({
  reducer: {
    auth: authReducer,
    postIndex: postIndexReducer,
  }
});
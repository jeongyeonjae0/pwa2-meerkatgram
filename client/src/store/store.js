import { configureStore } from "@reduxjs/toolkit";
import postIndexReducer from './slices/postIndexSlice.js';
import authReducer from './slices/authSlice.js';
import postShowReducer from './slices/postIndShowSlice.js';

export default configureStore({
  reducer: {
    auth: authReducer,
    postIndex: postIndexReducer,
    postShow: postShowReducer,
  }
});
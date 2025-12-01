import { configureStore } from "@reduxjs/toolkit";
import postIndexReducer from './slices/postIndexSlice.js';

export default configureStore({
  reducer: {
    postIndex: postIndexReducer,
  }
});
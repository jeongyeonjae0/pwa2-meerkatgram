import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance.js";

export const postDestroyThunk = createAsyncThunk(
  'postDestroy/postDestroyThunk', // Thunk 고유명
  async (id, { rejectWithValue }) => {
    try {
      const url = `/api/posts/${id}`;
      
      const response = await axiosInstance.delete(url);

      return response.data;
    } catch(error) {
      return rejectWithValue(error);
    }
  }
);
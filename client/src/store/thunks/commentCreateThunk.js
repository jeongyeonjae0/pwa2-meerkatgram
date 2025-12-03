import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance.js";

export const storeCommentThunk = createAsyncThunk(
  'commentStore/storeCommentThunk', // Thunk 고유명
  async (data, { rejectWithValue }) => {
    try {
      const url =  `/api/comments/`;

      const response = await axiosInstance.post(url, data);

      return response.data;
    } catch (error) {
      return rejectWithValue(error);    
    }
  }
);
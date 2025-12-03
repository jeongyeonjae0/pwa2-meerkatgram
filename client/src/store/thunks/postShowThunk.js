import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance.js";

export const postShowThunk = createAsyncThunk(
  'postShow/postShowThunk', // Thunk 고유명
  async (id, { rejectWithValue }) => {
    try {
      const url =  `/api/posts/${id}`;

      const response = await axiosInstance.get(url);

      return response.data; 
    } catch (error) {
      return rejectWithValue(error);    
    }
  }
);
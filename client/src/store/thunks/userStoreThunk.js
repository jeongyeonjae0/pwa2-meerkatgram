import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance.js";

export const userProfileUploadThunk = createAsyncThunk(
  'userCreate/userProfileUploadThunk', // Thunk 고유명
  async (file, { rejectWithValue }) => {
    try {
      const url = `/api/files/profiles`;
      const headers = {
        'Content-Type': 'multipart/form-data'
      };

      // 폼데이터 생성
      const formData = new FormData();
      formData.append('profile', file);

      const response = await axiosInstance.post(url, formData, { headers });

      return response.data;
    } catch(error) {
      return rejectWithValue(error);
    }
  }
);

export const userStoreThunk = createAsyncThunk(
  'userCreate/userStoreThunk', // Thunk 고유명
  async (data, { rejectWithValue }) => {
    try {
      const url = `/api/users`;
      
      const response = await axiosInstance.post(url, data);

      return response.data;
    } catch(error) {
      return rejectWithValue(error);
    }
  }
);
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance.js";

export const postImageUploadThunk = createAsyncThunk(
  'postCreate/postImageUploadThunk', 
  async (file, { rejectWithValue }) => {
    try {
      const url =  `/api/files/posts`; 
      const headers = {
        'Content-Type': 'multipart/form-data'
      }

      // 폼데이터 생성
      const formData = new FormData();
      formData.append('image', file);

      const response = await axiosInstance.post(url, formData, { headers });
    
      return response.data; 
    } catch (error) {
      return rejectWithValue(error);    
    }
  }
);

export const postStoreThunk = createAsyncThunk(
  'postCreate/postStoreThunk', 
  async (data, { rejectWithValue }) => {
    try {
      const url =  `/api/posts`; 

      const response = await axiosInstance.post(url, data);
    
      return response.data; 
    } catch (error) {
      return rejectWithValue(error);    
    }
  }
);
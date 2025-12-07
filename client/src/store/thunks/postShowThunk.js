import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance.js";

export const postShowThunk = createAsyncThunk(
  'postShow/postShowThunk', // Thunk 고유명
  async (id, { rejectWithValue }) => {
    try {
      const url =  `/api/posts/${id}`;

      const response = await axiosInstance.get(url);

      // 상세 데이터가 없을 시 예외 발생
      if(!response.data.data) {
        throw new Error('삭제된 게시글');
      }
      
      return response.data; 
    } catch (error) {
      return rejectWithValue(error);    
    }
  }
);
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance.js";

export const loginThunk = createAsyncThunk(
  'auth/loginThunk',
  async (args, { rejectWithValue }) => {
    try {
      const url = '/api/auth/login';
      const { email, password } = args; 
      
      const response = await axiosInstance.post(url, {email, password}); 

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// 토큰 재발급
export const reissueThunk = createAsyncThunk(
  'auth/reissueThunk',
  async (_, {rejectWithValue}) => {
    try {
      const url = '/api/auth/reissue';

      const response = await axiosInstance.post(url);

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
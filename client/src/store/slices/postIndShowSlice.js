import {createSlice} from '@reduxjs/toolkit';
import { postShowThunk } from '../thunks/postShowThunk.js';

const initialState ={
  show: null, 
}

const slice = createSlice({
  name: 'postShow',
  initialState,
  reducers: {
    clearPostShow(state) {
      state.show = null;
    }
  },
  extraReducers: (builder) => {
    builder 
      .addCase(postShowThunk.fulfilled, (state, action) => {
        state.show = action.payload.data;
      })
  },
});

export const {
  clearPostShow,
} = slice.actions; // redcuer에서 한 actions를 export, imort할 때 구조 분해 해서 사용

export default slice.reducer; // slice 자체를 반환, store에서 받아서 사용
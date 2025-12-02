import {createSlice} from '@reduxjs/toolkit';
import { postIndexThunk } from '../thunks/postIndexThunk.js';

const initialState ={
  list: null,
  page: 0,
  isLasted: false, // flg 만들 때 - 앞에 is or flg를 붙인다.    
}

const slice = createSlice({
  name: 'postIndex',
  initialState,
  reducers: {
    clearPostIndex(state) {
      state.list = null,
      state.page = 0;
    }
  },
  extraReducers: (builder) => {
    builder 
      .addCase(postIndexThunk.fulfilled, (state, action) => {
        const { posts, page, count, limit } = action.payload.data;

        // 리스트가 비어있는지 체크
        if(state.list) {
          state.list = [...state.list, ...posts]
        } else {
          state.list = posts;
        }

        // 현재 페이지 저장
        state.page = page;

        // 마지막 페이지 여부 플래그 저장
        state.isLasted = (page * limit) >= count;
      })
  },
});

export const {
  clearPostIndex,
} = slice.actions; // redcuer에서 한 actions를 export, imort할 때 구조 분해 해서 사용

export default slice.reducer; // slice 자체를 반환, store에서 받아서 사용
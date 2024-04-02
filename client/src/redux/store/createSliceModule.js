import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
};

export const createSliceModule = (name, data) =>
  createSlice({
    name,
    initialState,
    reducers: {},
    extraReducers: builder => {
      builder
        .addCase(data.pending, state => {
          state.isLoading = true;
          state.isError = false;
        })
        .addCase(data.fulfilled, (state, action) => {
          state.data = action.payload;
          state.isLoading = false;
          state.isError = false;
        })
        .addCase(data.rejected, state => {
          state.isLoading = false;
          state.isError = true;
          state.data = [];
        });
    },
  });

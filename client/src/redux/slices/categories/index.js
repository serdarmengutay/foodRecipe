import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {CallApi} from '../../../services';
import {createSliceModule} from '../../store/createSliceModule';

export const getAllCategories = createAsyncThunk('allCategories', async () => {
  const config = {
    url: `/categories.php`,
    method: 'GET',
  };
  return await CallApi(config);
});

export const getFoodsByCategory = createAsyncThunk(
  'foodsByCategory',
  async category => {
    const config = {
      url: `/filter.php?c=${category}`,
      method: 'GET',
    };
    return await CallApi(config);
  },
);

const allCategoriesSlice = createSliceModule('allCategories', getAllCategories);
const foodByCategorySlice = createSliceModule(
  'foodByCategory',
  getFoodsByCategory,
);

const allCategoryReducer = allCategoriesSlice.reducer;
const foodByCategoryReducer = foodByCategorySlice.reducer;
export {allCategoryReducer, foodByCategoryReducer};

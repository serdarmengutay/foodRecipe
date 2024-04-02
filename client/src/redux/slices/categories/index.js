import {createAsyncThunk} from '@reduxjs/toolkit';
import {CallApi} from '../../../services';
import {createSliceModule} from '../../store/createSliceModule';

export const getAllCategories = createAsyncThunk('allCategories', async () => {
  const config = {
    url: `/categories.php`,
    method: 'GET',
  };
  const response = await CallApi(config);
  return response;
});

const allCategoriesSlice = createSliceModule('allCategories', getAllCategories);
export default allCategoriesSlice.reducer;

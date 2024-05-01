import {createAsyncThunk} from '@reduxjs/toolkit';
import {CallApi} from '../../../services';
import {createSliceModule} from '../../store/createSliceModule';

export const getFoodRecipeById = createAsyncThunk(
  'foodRecipeById',
  async id => {
    const config = {
      url: `/lookup.php?i=${id}`,
      method: 'GET',
    };
    return await CallApi(config);
  },
);

const foodRecipeByIdSlice = createSliceModule(
  'foodRecipeById',
  getFoodRecipeById,
);

const foodRecipeByIdReducer = foodRecipeByIdSlice.reducer;

export {foodRecipeByIdReducer};

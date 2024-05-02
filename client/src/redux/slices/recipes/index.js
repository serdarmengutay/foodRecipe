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

export const getFoodRandomly = createAsyncThunk('foodRandom', async () => {
  const config = {
    url: `/random.php`,
    method: 'GET',
  };
  return await CallApi(config);
});

const foodRecipeByIdSlice = createSliceModule(
  'foodRecipeById',
  getFoodRecipeById,
);
const foodRandomSlice = createSliceModule('foodRandom', getFoodRandomly);

const foodRecipeByIdReducer = foodRecipeByIdSlice.reducer;
const foodRandomReducer = foodRandomSlice.reducer;

export {foodRecipeByIdReducer, foodRandomReducer};

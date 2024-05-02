import {configureStore} from '@reduxjs/toolkit';
import {allCategoryReducer, foodByCategoryReducer} from '../slices/categories';
import {foodRecipeByIdReducer, foodRandomReducer} from '../slices/recipes';
import themeSlice from '../slices/themeSlice';

export const store = configureStore({
  reducer: {
    categories: allCategoryReducer,
    foodByCategory: foodByCategoryReducer,
    foodRecipe: foodRecipeByIdReducer,
    randomFoodRecipe: foodRandomReducer,
    theme: themeSlice,
  },
});

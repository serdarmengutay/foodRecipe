import {configureStore} from '@reduxjs/toolkit';
import {allCategoryReducer, foodByCategoryReducer} from '../slices/categories';
import themeSlice from '../slices/themeSlice';

export const store = configureStore({
  reducer: {
    categories: allCategoryReducer,
    foodByCategory: foodByCategoryReducer,
    theme: themeSlice,
  },
});

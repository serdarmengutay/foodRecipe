import {configureStore} from '@reduxjs/toolkit';
import allCategoriesSlice from '../slices/categories';
import themeSlice from '../slices/themeSlice';

export const store = configureStore({
  reducer: {
    categories: allCategoriesSlice,
    theme: themeSlice,
  },
});

import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    mode: 'light',
  },
  reducers: {
    toggleTheme: async state => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      await AsyncStorage.setItem('themeMode', state.mode);
    },
    initializeThemeAsync: () => async dispatch => {
      try {
        const savedTheme = await AsyncStorage.getItem('themeMode');
        if (savedTheme) {
          dispatch(setTheme(savedTheme));
        }
      } catch (error) {
        console.error('Error initializing theme:', error);
      }
    },
    setTheme: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const {toggleTheme, initializeThemeAsync} = themeSlice.actions;
export default themeSlice.reducer;

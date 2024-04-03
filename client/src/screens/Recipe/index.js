import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {toggleTheme} from '../../redux/slices/themeSlice';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Recipe = ({navigation}) => {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme.mode);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return <View style={styles.container}></View>;
};

export default Recipe;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

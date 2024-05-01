import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {getFoodsByCategory} from '../../../redux/slices/categories';

const RecipeDetail = ({route}) => {
  const {data} = route.params;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFoodsByCategory());
  }, []);

  return (
    <View>
      <Text>RecipeDetail</Text>
      <Text>{data.title}</Text>
    </View>
  );
};

export default RecipeDetail;

const styles = StyleSheet.create({});

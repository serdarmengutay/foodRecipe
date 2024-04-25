import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const RecipeDetail = ({route}) => {
  const {data} = route.params;
  console.log(data);
  return (
    <View>
      <Text>RecipeDetail</Text>
    </View>
  );
};

export default RecipeDetail;

const styles = StyleSheet.create({});

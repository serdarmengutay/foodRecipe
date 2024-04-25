import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Recipe from '../screens/Recipe';
import RecipeDetail from '../screens/Recipe/Detail';

const Stack = createNativeStackNavigator();

const RecipeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Recipe" component={Recipe} />
      <Stack.Screen name="RecipeDetail" component={RecipeDetail} />
    </Stack.Navigator>
  );
};

export default RecipeStack;

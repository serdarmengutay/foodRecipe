import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from '../screens/Profile';
import Recipe from '../screens/Recipe';
import Favorites from '../screens/Favorites';
import Shop from '../screens/Shop';

const Tab = createBottomTabNavigator();

const BottomTabNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          shadowColor: '#000',
          shadowOffset: {
            width: 1,
            height: 0,
          },
          shadowOpacity: 0.1,
        },
      }}>
      <Tab.Screen name="Recipe" component={Recipe} />
      <Tab.Screen name="Favorites" component={Favorites} />
      <Tab.Screen name="Shop" component={Shop} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default BottomTabNav;

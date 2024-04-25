import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Recipe from '../screens/Recipe';
import Favorites from '../screens/Favorites';
import Shop from '../screens/Shop';
import ProfileStack from './ProfileStack';
import RecipeStack from './RecipeStack';
import Icon from 'react-native-vector-icons/Feather';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const BottomTabNav = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName;

          if (route.name === 'RecipeStack') {
            iconName = 'book';
          } else if (route.name === 'Favorites') {
            iconName = 'heart';
          } else if (route.name === 'Shop') {
            iconName = 'shopping-bag';
          } else if (route.name === 'ProfileStack') {
            iconName = 'user';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'orange',
        tabBarInactiveTintColor: 'lightgray',
        tabBarShowLabel: false,
        headerShown: false,
      })}>
      <Tab.Screen
        name="RecipeStack"
        component={RecipeStack}
        options={({route}) => ({
          tabBarLabel: 'Recipe',
          tabBarStyle: (route => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? '';
            if (routeName === 'RecipeDetail') {
              return {display: 'none'};
            }
            return {};
          })(route),
        })}
      />
      <Tab.Screen
        name="Favorites"
        component={Favorites}
        options={{
          tabBarLabel: 'Favorites',
        }}
      />
      <Tab.Screen
        name="Shop"
        component={Shop}
        options={{
          tabBarLabel: 'Shop',
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={({route}) => ({
          tabBarLabel: 'Profile',
          tabBarStyle: (route => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? '';
            if (routeName === 'ChangeLanguage') {
              return {display: 'none'};
            }
            if (routeName === 'ChangePassword') {
              return {display: 'none'};
            }
            return {};
          })(route),
        })}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNav;

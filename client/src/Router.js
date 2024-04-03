import React from 'react';
import {Provider} from 'react-redux';
import {store} from './redux/store/store';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabNav from './navigations/BottomTabNav';
import Splash from './screens/Splash/Splash';
import RegistrationNav from './navigations/RegistrationNav';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="SplashScreen" component={Splash} />
          <Stack.Screen name="RegistrationNav" component={RegistrationNav} />
          <Stack.Screen name="BottomTabNav" component={BottomTabNav} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;

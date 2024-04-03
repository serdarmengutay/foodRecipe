import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {initializeThemeAsync} from '../../redux/slices/themeSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({navigation}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkUser = async () => {
      const token = await AsyncStorage.getItem('@token');
      if (token) {
        navigation.replace('BottomTabNav');
      } else {
        navigation.replace('RegistrationNav');
      }
    };

    // dispatch(initializeThemeAsync());
    checkUser();
  }, []);

  return (
    <View style={styles.container}>
      <Text>{t('welcome')}</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

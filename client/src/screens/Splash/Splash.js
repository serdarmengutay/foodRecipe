import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {initializeThemeAsync} from '../../redux/slices/themeSlice';

const Splash = ({navigation}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeThemeAsync());

    setTimeout(() => {
      navigation.replace('RegistrationNav');
    }, 2000);
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

import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {useTranslation} from 'react-i18next';
import {lightTheme} from '../../../theme/Theme';
import DetailHeader from '../../../components/DetailHeader';

const ChangeLanguage = ({navigation}) => {
  const {t} = useTranslation();
  return (
    <SafeAreaView style={styles.container}>
      <DetailHeader title="change_language" navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightTheme.PRIMARY_BACKGROUND_COLOR,
  },
});
export default ChangeLanguage;

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import i18next from 'i18next';
import {useTranslation} from 'react-i18next';
import {lightTheme} from '../../../theme/Theme';
import DetailHeader from '../../../components/DetailHeader';

const ChangeLanguage = ({navigation}) => {
  const {t} = useTranslation();

  const handleChangeLanguage = language => {
    if (language === i18next.language) {
      return Alert.alert(t('language_already_selected'));
    }
    i18next.changeLanguage(language);
    Alert.alert(t('language_changed'));
  };

  return (
    <SafeAreaView style={styles.container}>
      <DetailHeader title="change_language" navigation={navigation} />
      <TouchableOpacity
        onPress={() => handleChangeLanguage('tr')}
        activeOpacity={0.8}
        style={styles.flagContainer}>
        <Image
          source={require('../../../assets/images/turkey.png')}
          style={styles.flag}
        />
        <Text style={styles.language}>{t('turkish')}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleChangeLanguage('en')}
        activeOpacity={0.8}
        style={styles.flagContainer}>
        <Image
          source={require('../../../assets/images/american.png')}
          style={styles.flag}
        />
        <Text style={styles.language}>{t('english')}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightTheme.PRIMARY_BACKGROUND_COLOR,
  },
  flagContainer: {
    backgroundColor: lightTheme.PRIMARY_BACKGROUND_COLOR,
    margin: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'orange',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  flag: {
    width: 100,
    height: 100,
  },
  language: {
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginTop: 5,
  },
});
export default ChangeLanguage;

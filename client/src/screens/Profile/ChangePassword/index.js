import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Input from '../../../components/Input';
import {lightTheme} from '../../../theme/Theme';
import DetailHeader from '../../../components/DetailHeader';

const ChangePassword = ({navigation}) => {
  const {t} = useTranslation();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const changePassword = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Password Error', 'Passwords do not match');
    } else {
      const token = await AsyncStorage.getItem('@token');
      const response = await fetch(
        'http://localhost:1337/api/change-password',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': token,
          },
          body: JSON.stringify({
            oldPassword,
            newPassword,
          }),
        },
      );
      const data = await response.json();
      if (data.status === 'ok') {
        Alert.alert('Password Changed', 'Password has been changed', [
          {text: 'OK', onPress: () => navigation.goBack()},
        ]);
      } else {
        Alert.alert('Registration Failed', 'Please check your details', [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <DetailHeader navigation={navigation} title={t('change_password')} />
      <View style={styles.wrapper}>
        <Input
          placeholder={t('old_password')}
          label={t('old_password')}
          secureTextEntry
          style={styles.input}
          value={oldPassword}
          onChangeText={text => setOldPassword(text)}
          inputContainer={styles.inputContainer}
        />
        <Input
          label={t('new_password')}
          secureTextEntry
          style={styles.input}
          placeholder={t('new_password')}
          value={newPassword}
          onChangeText={text => setNewPassword(text)}
          inputContainer={styles.inputContainer}
        />
        <Input
          label={t('new_password_confirm')}
          secureTextEntry
          style={styles.input}
          placeholder={t('new_password_confirm')}
          value={confirmPassword}
          onChangeText={text => setConfirmPassword(text)}
          inputContainer={styles.inputContainer}
        />
        <TouchableOpacity style={styles.changeBtn} onPress={changePassword}>
          <Text style={styles.btnText}>{t('change_password')}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightTheme.PRIMARY_BACKGROUND_COLOR,
  },
  wrapper: {
    padding: 20,
    width: '100%',
  },
  input: {
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: lightTheme.GRAY,
    borderRadius: 5,
    paddingVertical: 10,
    backgroundColor: lightTheme.PRIMARY_BACKGROUND_COLOR,
  },
  changeBtn: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
  },
  inputContainer: {
    marginVertical: 10,
    backgroundColor: lightTheme.PRIMARY_BACKGROUND_COLOR,
  },
});
export default ChangePassword;

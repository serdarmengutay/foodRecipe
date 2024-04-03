import React, {useState} from 'react';
import {
  Alert,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Input from '../../components/Input';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './auth.styles';
import {useTranslation} from 'react-i18next';

const Login = ({navigation}) => {
  const {t} = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    const response = await fetch('http://localhost:1337/api/login', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await response.json();
    if (data.user) {
      const token = data.user;
      await AsyncStorage.setItem('@token', token);
      navigation.navigate('BottomTabNav');
    } else {
      Alert.alert('Login Failed', 'Please check your email and password', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={16} />
        </TouchableOpacity>
        <Text style={styles.loginHeaderTitle}>{t('welcome_back')}</Text>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.body}>
        <Input
          value={email}
          onChangeText={e => setEmail(e)}
          placeholder="Email"
          label="Email"
          contentType="emailAddress"
        />
        <Input
          value={password}
          onChangeText={e => setPassword(e)}
          placeholder={t('password')}
          secureTextEntry={true}
          label={t('password')}
          contentType="password"
        />
      </KeyboardAvoidingView>
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>{t('sign_in')}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;

import {
  KeyboardAvoidingView,
  Text,
  View,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import Input from '../../components/Input';
import styles from './auth.styles';
import {useTranslation} from 'react-i18next';

const Register = ({navigation}) => {
  const {t} = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    const response = await fetch('http://localhost:1337/api/register', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    const data = await response.json();
    if (data.status === 'ok') {
      navigation.navigate('Login');
    } else {
      Alert.alert('Registration Failed', 'Please check your details', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('welcome')}</Text>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.body}>
        <Input
          value={name}
          onChangeText={e => setName(e)}
          placeholder="Username"
          label="Username"
          autoCapitalize="none"
          contentType="username"
        />
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
          placeholder="Password"
          secureTextEntry={true}
          label="Password"
          contentType="password"
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={styles.alreadyHave}>
          <Text style={styles.alreadyHaveText}>
            {t('already_have_account')}
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Register;

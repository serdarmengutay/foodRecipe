import {Alert, Button, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
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
    console.log('login data => ', data);
  };

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={e => setEmail(e)}
        placeholder="Email"
      />
      <TextInput
        value={password}
        onChangeText={e => setPassword(e)}
        style={styles.input}
        placeholder="Password"
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    margin: 10,
    width: '80%',
  },
});

import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';

const Register = ({navigation}) => {
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
    }
    console.log('data => ', data);
  };

  return (
    <View style={styles.container}>
      <Text>Register</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={e => setName(e)}
        placeholder="Name"
      />
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

export default Register;

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

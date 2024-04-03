import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {lightTheme} from '../theme/Theme';

const Input = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          value={props.value}
          onChangeText={props.onChangeText}
          placeholder={props.placeholder}
          secureTextEntry={props.secureTextEntry}
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          textContentType={props.contentType}
          {...props}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 5,
  },
  inputContainer: {
    width: '100%',
    marginVertical: 10,
    backgroundColor: '#efefef',
    padding: 10,
    borderRadius: 5,
  },
  label: {
    fontWeight: 'bold',
    color: lightTheme.PRIMARY_TITLE_COLOR,
    fontSize: 16,
  },
  input: {
    width: '90%',
    paddingLeft: 10,
  },
});

export default Input;

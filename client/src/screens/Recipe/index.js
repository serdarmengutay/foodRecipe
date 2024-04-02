import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {toggleTheme} from '../../redux/slices/themeSlice';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Recipe = ({navigation}) => {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme.mode);
  const [quote, setQuote] = useState('');
  const [tempQuote, setTempQuote] = useState('');

  // const handleToggleTheme = () => {
  //   dispatch(toggleTheme());
  // };
  useEffect(() => {
    const populateQuote = async () => {
      const token = await AsyncStorage.getItem('@token');
      const req = await fetch('http://localhost:1337/api/quote', {
        headers: {
          'x-access-token': token,
        },
        method: 'GET',
      });
      const data = await req.json();
      if (data.status === 'ok') {
        setQuote(data.quote);
      } else {
        console.log('dataerror=> ', data.error);
      }
    };
    populateQuote();
  }, [tempQuote]);

  const handleUpdateQuote = async () => {
    const token = await AsyncStorage.getItem('@token');
    const req = await fetch('http://localhost:1337/api/quote', {
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        quote: tempQuote,
      }),
    });
    const data = await req.json();
    if (data.status === 'ok') {
      setQuote(tempQuote);
      setTempQuote('');
    } else {
      console.log('dataerror=> ', data.error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>{quote}</Text>
      <TextInput
        value={tempQuote}
        onChangeText={e => setTempQuote(e)}
        placeholder="Quote"
      />
      <Button title="send quote" onPress={handleUpdateQuote} />
    </View>
  );
};

export default Recipe;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

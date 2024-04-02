import {Button, FlatList, StyleSheet, View, Text} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getAllCategories} from '../../redux/slices/categories';
import {useTranslation} from 'react-i18next';
import i18next from '../../services/langs/i18next';

const Profile = () => {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories.data);
  const {t} = useTranslation();

  const handleData = () => {
    dispatch(getAllCategories());
  };

  return (
    <View style={styles.container}>
      <Button title={t('welcome')} onPress={handleData} />
      <FlatList
        data={categories?.categories}
        renderItem={({item}) => (
          <View>
            <Text>{item.strCategory}</Text>
          </View>
        )}
      />
      <View>
        <Button
          title={t('change_language')}
          onPress={() => i18next.changeLanguage('tr')}
        />
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

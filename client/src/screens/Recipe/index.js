import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getAllCategories} from '../../redux/slices/categories';
import {categoryList} from '../../dummydb/db';
import CategoryCard from '../../components/CategoryCard';
import {lightTheme} from '../../theme/Theme';

const Recipe = ({navigation}) => {
  const dispatch = useDispatch();
  const categoryData = useSelector(state => state.categories.data.categories);
  const [userName, setUserName] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  useEffect(() => {
    const getUserInfo = async () => {
      const token = await AsyncStorage.getItem('@token');
      const response = await fetch('http://localhost:1337/api/user', {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
        method: 'GET',
      });

      const data = await response.json();
      setUserName(data.user.name);
    };
    getUserInfo();
  }, []);

  const handleSelectCategory = category => {
    setSelectedCategory(category);
  };

  const chooseCategory = category => {
    navigation.navigate('RecipeDetail', {data: category});
  };

  console.log(categoryData);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.wrapper}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Welcome back, {userName}!</Text>
          </View>
          <View style={styles.categoryList}>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}>
              {categoryList.map((item, index) => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.categoryListBtn}
                    onPress={() => handleSelectCategory(item.id)}
                    key={index}>
                    <Text key={item.id} style={styles.categoryListBtnText}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
          {selectedCategory === 1 && (
            <View style={styles.categoryContainer}>
              <FlatList
                data={categoryData}
                keyExtractor={item => item.id}
                renderItem={({item}) => {
                  return (
                    <CategoryCard
                      item={item}
                      chooseCategory={() => chooseCategory(item)}
                    />
                  );
                }}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Recipe;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightTheme.PRIMARY_BACKGROUND_COLOR,
  },
  scrollViewContent: {
    alignItems: 'center',
    flexGrow: 1,
  },
  wrapper: {
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  headerText: {
    color: lightTheme.PRIMARY_TEXT_COLOR,
    fontSize: 20,
    fontWeight: 600,
  },
  categoryList: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  categoryListBtn: {
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    borderRadius: 6,
    paddingHorizontal: 20,
    marginRight: 10,
  },
  categoryListBtnText: {
    color: lightTheme.PRIMARY_BACKGROUND_COLOR,
    fontWeight: 600,
  },
  categoryContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
});

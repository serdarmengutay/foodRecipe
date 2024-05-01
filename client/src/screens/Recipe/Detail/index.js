import {SafeAreaView, StyleSheet, View, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {FlashList} from '@shopify/flash-list';
import {getFoodsByCategory} from '../../../redux/slices/categories';
import FoodCard from '../../../components/FoodCard';
import DetailHeader from '../../../components/DetailHeader';
import SearchBar from '../../../components/SearchBar';
import {lightTheme} from '../../../theme/Theme';

const RecipeDetail = ({route, navigation}) => {
  const {t} = useTranslation();
  const {data} = route.params;
  const dispatch = useDispatch();
  const foodByCategory = useSelector(state => state.foodByCategory);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getFoodsByCategory(data.strCategory))
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, []);

  const filterData = foodByCategory?.data?.meals?.filter(item => {
    return item?.strMeal?.toLowerCase().includes(search.toLowerCase());
  });

  const handleSelectFood = id => {
    console.log(id);
    navigation.navigate('Food', {id: id});
  };

  return (
    <SafeAreaView style={styles.container}>
      <DetailHeader navigation={navigation} title={t(data.strCategory)} />
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <SearchBar
            value={search}
            onChangeText={setSearch}
            placeholder={t('search')}
          />
        </View>
      </View>
      {loading ? (
        <View style={styles.spinnerContainer}>
          <ActivityIndicator size="large" color={lightTheme.PRIMARY_COLOR} />
        </View>
      ) : (
        <View style={styles.cardContainer}>
          <FlashList
            data={filterData}
            renderItem={({item}) => {
              return (
                <FoodCard
                  item={item}
                  onPress={() => handleSelectFood(item.idMeal)}
                />
              );
            }}
            showsVerticalScrollIndicator={false}
            estimatedItemSize={50}
            keyExtractor={item => item.idMeal}
            numColumns={2}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default RecipeDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightTheme.PRIMARY_BACKGROUND_COLOR,
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  cardContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  searchContainer: {
    paddingHorizontal: 20,
  },
});

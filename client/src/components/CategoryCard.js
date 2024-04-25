import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {lightTheme} from '../theme/Theme';

const CategoryCard = ({item, chooseCategory}) => {
  return (
    <TouchableOpacity
      onPress={chooseCategory}
      activeOpacity={0.8}
      style={styles.categoryCard}>
      <View>
        <Image style={styles.image} src={item.strCategoryThumb} />
      </View>
      <View style={styles.categoryDetail}>
        <Text style={styles.categoryName}>{item.strCategory}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  categoryCard: {
    backgroundColor: lightTheme.PRIMARY_BACKGROUND_COLOR,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 8,
    paddingTop: 10,
    marginHorizontal: 10,
  },
  image: {
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    width: '100%',
    height: 150,
    resizeMode: 'contain',
  },
  categoryDetail: {
    width: '100%',
    padding: 10,
    backgroundColor: 'orange',
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  categoryName: {
    color: lightTheme.PRIMARY_BACKGROUND_COLOR,
    fontSize: 16,
  },
});

export default CategoryCard;

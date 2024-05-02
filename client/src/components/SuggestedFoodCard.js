import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const SuggestedFoodCard = ({item, onPress}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.foodCard}
      onPress={onPress}>
      <ImageBackground
        resizeMode="cover"
        resizeMethod="scale"
        borderRadius={25}
        source={{uri: item.strMealThumb}}
        style={styles.backgroundImage}>
        <View style={styles.foodNameContainer}>
          <Text numberOfLines={1} style={styles.foodName}>
            {item.strMeal}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default SuggestedFoodCard;

const styles = StyleSheet.create({
  foodCard: {
    borderRadius: 25,
    marginVertical: 10,
    width: '100%',
    height: Dimensions.get('screen').height / 2.5,
  },
  backgroundImage: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  foodNameContainer: {
    backgroundColor: 'orange',
    padding: 10,
    width: '100%',
    borderRadius: 25,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
  },
  foodName: {
    color: '#fff',
    fontWeight: 700,
  },
});

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {lightTheme} from '../../../theme/Theme';
import {useDispatch, useSelector} from 'react-redux';
import {getFoodRecipeById} from '../../../redux/slices/recipes';

const Food = ({route, navigation}) => {
  const {id} = route.params;
  const dispatch = useDispatch();
  const foodRecipe = useSelector(state => state.foodRecipe);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(getFoodRecipeById(id))
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }, []);

  console.log(foodRecipe?.data?.meals);
  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color={lightTheme.PRIMARY_COLOR} />
      ) : (
        <View>
          <Text>{id}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightTheme.PRIMARY_BACKGROUND_COLOR,
  },
});

export default Food;

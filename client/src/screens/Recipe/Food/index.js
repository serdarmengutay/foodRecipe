import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Linking,
  Animated,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {lightTheme} from '../../../theme/Theme';
import {useDispatch, useSelector} from 'react-redux';
import {getFoodRecipeById} from '../../../redux/slices/recipes';
import Icon from 'react-native-vector-icons/FontAwesome';

const Food = ({route, navigation}) => {
  const {t} = useTranslation();
  const {id} = route.params;
  const dispatch = useDispatch();
  const foodRecipe = useSelector(state => state.foodRecipe);
  const [isLoading, setIsLoading] = useState(true);
  const [showInstructions, setShowInstructions] = useState(true);

  const scrollA = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    dispatch(getFoodRecipeById(id))
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }, []);

  const handleWatchYoutube = url => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollA}}}],
          {
            useNativeDriver: true,
          },
        )}
        contentContainerStyle={{
          paddingBottom: 30,
        }}
        showsVerticalScrollIndicator={false}
        style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size="large" color={lightTheme.PRIMARY_COLOR} />
        ) : (
          <View>
            <View style={styles.header}>
              <Animated.Image
                style={styles.foodImage(scrollA)}
                borderBottomRightRadius={45}
                borderBottomLeftRadius={45}
                source={{
                  uri: foodRecipe?.data?.meals[0]?.strMealThumb,
                }}
              />
            </View>
            <View style={styles.foodDetailContainer}>
              <View style={styles.detailHeader}>
                <View>
                  <Text style={styles.strMeal}>
                    {foodRecipe?.data?.meals[0]?.strMeal}
                  </Text>
                  <View style={styles.areaContainer}>
                    <Text style={styles.strArea}>
                      {foodRecipe?.data?.meals[0]?.strArea}
                    </Text>
                    <Text style={styles.strArea}> / </Text>
                    <Text style={styles.strArea}>
                      {foodRecipe?.data?.meals[0]?.strTags}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() =>
                    handleWatchYoutube(foodRecipe?.data?.meals[0]?.strYoutube)
                  }
                  style={styles.watchYoutubeBtn}>
                  <Icon name="youtube-play" size={25} color="#FF0000" />
                </TouchableOpacity>
              </View>
              <View style={styles.tabContainer}>
                <TouchableOpacity
                  style={[
                    styles.tabButton,
                    showInstructions && styles.activeTab,
                  ]}
                  onPress={() => setShowInstructions(true)}>
                  <Text style={styles.tabText}>{t('instruction')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.tabButton,
                    !showInstructions && styles.activeTab,
                  ]}
                  onPress={() => setShowInstructions(false)}>
                  <Text style={styles.tabText}>{t('ingredients')}</Text>
                </TouchableOpacity>
              </View>
              {showInstructions ? (
                <View style={styles.instructionContainer}>
                  <Text style={styles.instructionText}>
                    {foodRecipe?.data?.meals[0]?.strInstructions}
                  </Text>
                </View>
              ) : (
                <View style={styles.ingredientsContainer}>
                  {Object.keys(foodRecipe?.data?.meals[0]).map(key => {
                    if (
                      key.includes('strIngredient') &&
                      foodRecipe?.data?.meals[0][key]
                    ) {
                      return (
                        <View key={key} style={styles.ingredientItem}>
                          <Text style={styles.ingredientText}>
                            {foodRecipe?.data?.meals[0][key]}
                          </Text>
                          <Text style={styles.ingredientText}>
                            {
                              foodRecipe?.data?.meals[0][
                                `strMeasure${key.split('strIngredient')[1]}`
                              ]
                            }
                          </Text>
                        </View>
                      );
                    }
                  })}
                </View>
              )}
            </View>
          </View>
        )}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightTheme.PRIMARY_BACKGROUND_COLOR,
  },
  header: {},
  foodImage: scrollA => ({
    width: '100%',
    height: Dimensions.get('screen').height / 3,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [
      {
        translateY: scrollA.interpolate({
          inputRange: [-Dimensions.get('screen').height / 3, 0],
          outputRange: [-Dimensions.get('screen').height / 3, 0],
          extrapolate: 'clamp',
        }),
      },
      {
        scale: scrollA.interpolate({
          inputRange: [
            -Dimensions.get('screen').height / 3,
            0,
            Dimensions.get('screen').height / 3,
          ],
          outputRange: [2, 1, 1],
          extrapolate: 'clamp',
        }),
      },
    ],
  }),
  foodDetailContainer: {
    padding: 20,
  },
  detailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  areaContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 5,
  },
  strMeal: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  strArea: {
    color: lightTheme.PRIMARY_COLOR,
    fontWeight: 300,
  },
  instructionContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  instructionText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '300',
    letterSpacing: 1.2,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  tabButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'orange',
  },
  activeTab: {
    borderBottomColor: 'orange',
  },
  watchYoutubeBtn: {
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    borderColor: 'orange',
    borderWidth: 1,
    borderStyle: 'solid',
    padding: 10,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  ingredientText: {
    fontSize: 16,
    fontWeight: '300',
  },
  ingredientsContainer: {
    marginTop: 20,
  },
  ingredientItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'orange',
    paddingVertical: 10,
  },
});

export default Food;

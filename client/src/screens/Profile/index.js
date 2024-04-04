import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import i18next from 'i18next';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getAllCategories} from '../../redux/slices/categories';
import Icon from 'react-native-vector-icons/Feather';
import {lightTheme} from '../../theme/Theme';

const detailData = [
  {
    id: 1,
    title: 'change_language',
    link: 'ChangeLanguage',
  },
  {
    id: 2,
    title: 'change_password',
    link: 'ChangePassword',
  },
  {
    id: 3,
    title: 'log_out',
    function: true,
  },
];

const Profile = ({navigation}) => {
  const {t, i18n} = useTranslation();
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState([]);
  const categories = useSelector(state => state.categories.data);

  const handleData = () => {
    dispatch(getAllCategories());
  };

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
      setUserInfo(data.user);
    };
    getUserInfo();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.infoCont}>
          <View style={styles.imageCont}>
            <Image />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.name}>{userInfo.name}</Text>
            <Text style={styles.email}>{userInfo.email}</Text>
          </View>
        </View>
      </View>
      <View style={styles.body}>
        <View>
          <Text style={styles.detailTitle}>Details</Text>
          <View>
            {detailData.map(item => (
              <TouchableOpacity
                style={styles.detailItem}
                onPress={
                  item.link
                    ? () => navigation.navigate(item.link)
                    : () => {
                        return Alert.alert(
                          'Log Out',
                          'Are you sure you want to log out?',
                          [
                            {
                              text: 'Cancel',
                              onPress: () => console.log('Cancel Pressed'),
                              style: 'cancel',
                            },
                            {
                              text: 'OK',
                              onPress: () => {
                                AsyncStorage.removeItem('@token');
                                navigation.navigate('Login');
                              },
                            },
                          ],
                        );
                      }
                }>
                <Text>{t(item.title)}</Text>
                <Icon name="chevron-right" size={24} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightTheme.PRIMARY_BACKGROUND_COLOR,
  },
  header: {
    backgroundColor: 'orange',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    height: '40%',
  },
  infoCont: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    backgroundColor: lightTheme.PRIMARY_BACKGROUND_COLOR,
    marginTop: '55%',
    padding: 20,
    height: '100%',
  },
  imageCont: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'white',
  },
  userInfo: {
    alignItems: 'center',
    marginTop: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: lightTheme.PRIMARY_BACKGROUND_COLOR,
  },
  email: {
    fontSize: 16,
    color: lightTheme.PRIMARY_BACKGROUND_COLOR,
    marginTop: 5,
  },
  detailTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: lightTheme.PRIMARY_TEXT_COLOR,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    borderBottomColor: lightTheme.PRIMARY_TEXT_COLOR,
  },
});

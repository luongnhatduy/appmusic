import React, {
  useEffect,
  Fragment,
  useMemo,
  useCallback,
  useState,
} from 'react';
// import {withNavigation} from 'react-navigation';
import {View, Text, Image, Dimensions, StyleSheet} from 'react-native';
import NavigationService from '@utils/NavigationService';
import {TouchableOpacity} from 'react-native';
import {withNavigation} from 'react-navigation';
import {LoginManager} from 'react-native-fbsdk';
import {useSelector, useDispatch} from 'react-redux';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
import {actions as storageAction} from '@modules/storage/store';
import {actions as profileAction} from '@modules/profile/store';

const ProfileScreen = ({navigation}) => {
  const {dataProfile, isLogged} = useSelector(state => state.storage);
  const dispatch = useDispatch();

  const handleLogout = useCallback(async () => {
    await LoginManager.logOut();
    dispatch(storageAction.setIsLogged(false));
  }, [dispatch]);

  const loginFaceBook = useCallback(async () => {
    dispatch(profileAction.login());
  }, [dispatch]);

  return (
    <Fragment>
      {useMemo(
        () => (
          <View style={styles.container}>
            {isLogged ? (
              <View style={styles.viewProfile}>
                <Image
                  style={styles.avt}
                  source={{
                    uri: dataProfile.urlImg,
                  }}
                />
                <Text style={styles.name}>{dataProfile.name}</Text>
                <TouchableOpacity
                  style={styles.btLogout}
                  onPress={handleLogout}>
                  <Text style={styles.txtLogout}>Đăng xuất</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity style={styles.btlogin} onPress={loginFaceBook}>
                <View style={{backgroundColor: 'white', borderRadius: 10}}>
                  <Image
                    style={styles.iconfb}
                    source={require('@assets/images/facebook.png')}
                  />
                </View>
                <Text style={styles.txtLoginFb}>Đăng nhập bằng FaceBook</Text>
              </TouchableOpacity>
            )}
          </View>
        ),
        [
          dataProfile.name,
          dataProfile.urlImg,
          handleLogout,
          isLogged,
          loginFaceBook,
        ],
      )}
    </Fragment>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  avt: {
    width: screenWidth * 0.4,
    height: screenWidth * 0.4,
    borderRadius: screenWidth * 0.4,
  },
  viewProfile: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 26,
    fontWeight: '500',
    marginTop: 10,
  },
  txtLogout: {
    color: 'red',
    fontWeight: '500',
    fontSize: 20,
  },
  btLogout: {
    width: screenWidth * 0.5,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 40,
    marginTop: 50,
  },
  iconfb: {
    width: 35,
    height: 35,
  },
  btlogin: {
    backgroundColor: '#4267b2',
    borderRadius: 50,
    height: 50,
    width: '80%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
  txtLoginFb: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});
export default withNavigation(ProfileScreen);

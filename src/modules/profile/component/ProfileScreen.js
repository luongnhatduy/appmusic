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
import {Linking} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const ProfileScreen = ({navigation}) => {
  const handleLogout = useCallback(() => {}, []);

  const loginFaceBook = useCallback(() => {
    // Linking.openURL('https://98351aef5a01.ngrok.io/auth/facebook');
  }, []);

  // useEffect(() => {
  //   try {
  //     Linking.addEventListener('url', event => {
  //       console.log('event: ', event);
  //     });
  //     Linking.getInitialURL().then(url => {
  //       if (url) {
  //         console.log('url: ', url);
  //       }
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);
  return (
    <Fragment>
      {useMemo(
        () => (
          <View style={styles.container}>
            <Image
              style={styles.avt}
              source={{
                uri:
                  'https://scontent.fhan2-5.fna.fbcdn.net/v/t1.0-9/118565996_2665047913762533_6111069045192585394_o.jpg?_nc_cat=109&ccb=2&_nc_sid=09cbfe&_nc_ohc=m7OV_NDXsM4AX_zBN8Z&_nc_ht=scontent.fhan2-5.fna&oh=44c454f6ba465db9ddfa4126f2e65afb&oe=60174121',
              }}
            />
            <Text style={styles.name}>Lương Nhật Duy</Text>
            <TouchableOpacity style={styles.btLogout} onPress={handleLogout}>
              <Text style={styles.txtLogout}>Đăng xuất</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity style={styles.btlogin} onPress={loginFaceBook}>
              <View style={{backgroundColor: 'white', borderRadius: 10}}>
                <Image
                  style={styles.iconfb}
                  source={require('@assets/images/facebook.png')}
                />
              </View>
              <Text style={styles.txtLoginFb}>Đăng nhập bằng FaceBook</Text>
            </TouchableOpacity> */}
          </View>
        ),
        [handleLogout],
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

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

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const LoginScreen = ({navigation}) => {
  const [isShowBtLogin, setIsShowBtLogin] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsShowBtLogin(true);
    }, 3300);
  }, []);

  const handleLogin = useCallback(() => {
    NavigationService.reset('RootTabNavigator');
  }, []);
  return (
    <View style={styles.container}>
      <Image
        style={styles.splash}
        resizeMode="stretch"
        source={require('@assets/images/applemusic.gif')}
      />
      {!!isShowBtLogin && (
        <TouchableOpacity style={styles.btlogin} onPress={handleLogin}>
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
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  splash: {
    width: screenWidth,
    height: screenHeight,
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
    position: 'absolute',
    zIndex: 10000,
    bottom: 70,
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
export default LoginScreen;

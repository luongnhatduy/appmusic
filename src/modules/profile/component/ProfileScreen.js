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
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
import {useSelector, useDispatch} from 'react-redux';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
import {actions as storageAction} from '@modules/storage/store';

const ProfileScreen = ({navigation}) => {
  const [imgurl, setImgUrl] = useState('');
  const [name, setName] = useState('');
  const {dataProfile, isLogged} = useSelector(state => state.storage);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      dataProfile &&
      dataProfile.id &&
      dataProfile.name &&
      dataProfile.urlImg
    ) {
      setImgUrl(dataProfile.urlImg);
      setName(dataProfile.name);
    }
  }, [dataProfile]);

  const handleLogout = useCallback(async () => {
    await LoginManager.logOut();
    dispatch(storageAction.setIsLogged(false));
  }, [dispatch]);

  const loginFaceBook = useCallback(async () => {
    await LoginManager.logOut();
    // Linking.openURL('https://98351aef5a01.ngrok.io/auth/facebook');
    LoginManager.logInWithPermissions(['public_profile']).then(
      function(result) {
        console.log('result', result);

        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          console.log(
            'Login success with permissions: ' +
              result.grantedPermissions.toString(),
          );

          AccessToken.getCurrentAccessToken().then(data => {
            console.log('data', data);
            if (data.accessToken) {
              console.log(data.accessToken, 'token');
              getInfoFromToken(data.accessToken.toString());
            }
          });
        }
      },
      function(error) {
        console.log('Login fail with error: ' + error);
      },
    );
  }, [getInfoFromToken]);

  const getInfoFromToken = useCallback(
    token => {
      const PROFILE_REQUEST_PARAMS = {
        fields: {
          string:
            'id, name, first_name, last_name, birthday, email, picture.type(large)',
        },
      };
      const profileRequest = new GraphRequest(
        '/me',
        {token, parameters: PROFILE_REQUEST_PARAMS},
        (error, result) => {
          if (error) {
            console.log('Login Info has an error:', error);
          } else {
            console.log('result', result);
            setImgUrl(result.picture.data.url);
            setName(result.name);
            const data = {
              id: result.id,
              name: result.name,
              urlImg: result.picture.data.url,
            };
            console.log('data', data);
            dispatch(storageAction.setDataProfile(data));
            dispatch(storageAction.setIsLogged(true));
            if (result.isCancelled) {
              console.log('Login cancelled');
            }
            if (result.email === undefined) {
              console.log('email undefined');
            } else {
              console.log(result);
            }
          }
        },
      );
      new GraphRequestManager().addRequest(profileRequest).start();
    },
    [dispatch],
  );

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
                    uri: imgurl,
                  }}
                />
                <Text style={styles.name}>{name}</Text>
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
        [handleLogout, imgurl, isLogged, loginFaceBook, name],
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

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

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const ProfileScreen = ({navigation}) => {
  const handleLogout = useCallback(() => {}, []);
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
});
export default withNavigation(ProfileScreen);

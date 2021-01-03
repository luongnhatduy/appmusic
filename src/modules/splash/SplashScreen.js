import React, {useEffect, Fragment, useMemo} from 'react';
// import {withNavigation} from 'react-navigation';
import {View, Text, Image, Dimensions, StyleSheet} from 'react-native';
import NavigationService from '@utils/NavigationService';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      NavigationService.reset('RootTabNavigator');
    }, 3300);
  }, []);
  return (
    <View style={styles.container}>
      <Image
        style={styles.splash}
        resizeMode="stretch"
        source={require('@assets/images/applemusic.gif')}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1},
  splash: {
    width: screenWidth,
    height: screenHeight,
  },
});
export default SplashScreen;

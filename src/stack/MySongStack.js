import {createStackNavigator} from 'react-navigation-stack';
import {Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {createAppContainer} from 'react-navigation';
import MySongScreen from '@modules/mysong';
import CustomHeader from '@components/layout/CustomHeader';
import React from 'react';
import SearchScreen from '@modules/search/component/SearchScreen';
import ProfileScreen from '../modules/profile/component/ProfileScreen';

const MySongStack = createStackNavigator(
  {
    MySongScreen: {
      screen: MySongScreen,
      navigationOptions: ({navigation}) => ({
        header: <CustomHeader />,
      }),
    },
    SearchScreen: {
      screen: SearchScreen,
      navigationOptions: ({navigation}) => ({
        header: <CustomHeader search />,
      }),
    },
    ProfileScreen: {
      screen: ProfileScreen,
      navigationOptions: ({navigation}) => ({
        header: <CustomHeader />,
      }),
    },
  },
  {
    initialRouteName: 'MySongScreen',
    defaultNavigationOptions: {header: null},
  },
);

const styles = StyleSheet.create({
  headerHomeScreen: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    width: 89,
    height: 28,
  },
  textTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#424242',
  },
});

export default createAppContainer(MySongStack);

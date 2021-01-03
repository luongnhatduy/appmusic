import {createStackNavigator} from 'react-navigation-stack';
import {Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {createAppContainer} from 'react-navigation';
import React from 'react';
import CustomHeader from '@components/layout/CustomHeader';
import HomeScreen from '@modules/home';
import SearchScreen from '@modules/search/component/SearchScreen';
import ProfileScreen from '../modules/profile/component/ProfileScreen';
const HomeStack = createStackNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
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
    initialRouteName: 'HomeScreen',
    defaultNavigationOptions: {header: null},
  },
);
HomeStack.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;

  return {
    tabBarVisible,
  };
};

const styles = StyleSheet.create({});

export default createAppContainer(HomeStack);

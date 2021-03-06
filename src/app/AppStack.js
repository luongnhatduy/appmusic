/* eslint-disable react-native/no-inline-styles */
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {Platform, View, Text, StyleSheet, Image} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import i18n from '@i18n';
import HomeStack from '@stack/HomeStack';
import FavoriteStack from '@stack/FavoriteStack';
import MySongStack from '@stack/MySongStack';
import DisplayMusicScreen from '@modules/displaymusic/component/DisplayMusicScreen';
import PlayVideoScreen from '@modules/playvideo/component/PlayVideoScreen';
import SplashScreen from '@modules/splash/SplashScreen';

import CustomHeader from '@components/layout/CustomHeader';
import React from 'react';

const styles = StyleSheet.create({
  bage: {
    position: 'absolute',
    top: -10,
    right: -10,
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    padding: 0,
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 111,
    backgroundColor: '#FF7711',
  },
});

const RootTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: () => ({
        tabBarIcon: ({focused, tintColor}) => (
          <Image
            source={require('../assets/images/music.png')}
            style={{
              resizeMode: 'contain',
              width: 20,
              height: 20,
              tintColor: focused ? tintColor : '#BDBDBD',
            }}
          />
        ),
        title: 'Trang chủ',
        tabBarOnPress: ({navigation: {state, popToTop}, defaultHandler}) => {
          // popToTop();
          defaultHandler();
        },
      }),
    },
    Favorite: {
      screen: FavoriteStack,
      navigationOptions: () => ({
        tabBarIcon: ({focused, tintColor}) => (
          <Image
            source={require('../assets/images/e-commerce-like-heart.png')}
            style={{
              resizeMode: 'contain',
              width: 23,
              height: 23,
              tintColor: focused ? tintColor : '#BDBDBD',
            }}
          />
        ),
        title: 'Yêu thích',
        tabBarOnPress: ({navigation: {state, popToTop}, defaultHandler}) => {
          // popToTop();
          defaultHandler();
        },
      }),
    },
    MySong: {
      screen: MySongStack,
      navigationOptions: () => ({
        tabBarIcon: ({focused, tintColor}) => (
          <Image
            source={require('../assets/images/music-down.png')}
            style={{
              resizeMode: 'contain',
              width: 27,
              height: 27,
              tintColor: focused ? tintColor : '#BDBDBD',
            }}
          />
        ),
        title: 'Thư viện',
        tabBarOnPress: ({navigation: {state, popToTop}, defaultHandler}) => {
          // popToTop();
          defaultHandler();
        },
      }),
    },
  },
  {
    tabBarOptions: {
      tabStyle: {
        alignItems: 'center',
        padding: 0,
        opacity: 1,
      },
      activeTintColor: '#990099',
      labelStyle: {
        marginBottom: 0,
        fontSize: 12,
        textAlign: 'center',
        fontFamily: 'System',
      },
      style: {
        padding: 5,
        height: Platform.OS === 'ios' ? 55 : 58,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        justifyContent: 'space-evenly',
        borderBottomWidth: 1,
        borderBottomColor: '#eaeaea',
        flexDirection: 'row',
      },
    },
  },
  {
    tabBarComponent: () => null,
  },
);

const AppNavigator = createStackNavigator(
  {
    RootTabNavigator,
    SplashScreen,
    DisplayMusicScreen,
    PlayVideoScreen,
    // WebViewStack: WebViewScreen,
  },
  {
    initialRouteName: 'SplashScreen',
    defaultNavigationOptions: {header: null},
  },
);

export default createAppContainer(createSwitchNavigator({AppNavigator}));

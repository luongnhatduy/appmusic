import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Header, Left as BaseLeft, Body, Right as BaseRight} from 'native-base';
import i18n from '@i18n';
import BackIcon from '@assets/svg/BackIcon';
import NavigationService from '../../../utils/NavigationService';

const style = StyleSheet.create({
  hasBorder: {
    borderBottomWidth: 0.333,
    borderBottomColor: '#a7a6ab',
  },
  headerStyle: {
    height: 77,
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    // elevation: 5,
    // shadowOffset: {width: 0, height: 1},
    // shadowOpacity: 0.3,
    // shadowRadius: 3,
    // shadowColor: '#000000',
    // borderBottomColor: 'transparent',
  },
  leftStyle: {
    flex: 0,
    width: '10%',
  },
  contentStyle: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  rightStyle: {
    flex: 0,
    width: '10%',
  },
  showBack: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 10,
  },

  iconBack: {color: '#828282', fontSize: 20},
  titleSearch: {
    fontSize: 15,
    color: '#AAAAAA',
  },
  buttonSearch: {
    padding: 7,
    borderRadius: 50,
    width: '90%',
    backgroundColor: '#F4F4F4',
    elevation: 5,
    flexDirection: 'row',
    // justifyContent : 'center',
    alignItems: 'center',
  },
  txtnamesong: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
  txtnamesinger: {
    color: '#B5B5B5',
    fontSize: 13,
    marginTop: 3,
  },
});

const DisplayMusicHeader = ({item}) => (
  <Header
    iosBarStyle="dark-content"
    backgroundColor="white"
    androidStatusBarColor="white"
    style={style.headerStyle}>
    <BaseLeft style={[style.leftStyle]}>
      <TouchableOpacity
        style={style.showBack}
        onPress={() => {
          NavigationService.goBack();
        }}>
        <BackIcon fill="white" />
      </TouchableOpacity>
    </BaseLeft>
    <Body style={style.contentStyle}>
      <Text style={style.txtnamesong}>{item.name_song}</Text>
      <Text style={style.txtnamesinger}>{item.name_singer}</Text>
    </Body>
  </Header>
);

export default DisplayMusicHeader;

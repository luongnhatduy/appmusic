import React, {useCallback, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Header, Left as BaseLeft, Body, Right as BaseRight} from 'native-base';
import i18n from '@i18n';
import BackIcon from '@assets/svg/BackIcon';
import NavigationService from '../../../utils/NavigationService';
import {Image} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import SoundPlayer from 'react-native-sound-player';
import RNFS from 'react-native-fs';

const DisplayMusicHeader = ({item}) => {
  const {songplaying} = useSelector(state => state.storage);

  const handleDownload = useCallback(() => {
    console.log('oke', songplaying);
    console.log(
      'bo m day',
      songplaying.name_song.split(' ').join('_') +
        '+' +
        songplaying.name_singer.split(' ').join('_'),
    );
    let path =
      songplaying.name_song.split(' ').join('_') +
      '+' +
      songplaying.name_singer.split(' ').join('_');
    if (songplaying && songplaying.link) {
      RNFS.downloadFile({
        background: true,
        fromUrl: songplaying.link,
        progress: res => {
          console.log(res, 'res');
        },
        toFile: `${RNFS.DocumentDirectoryPath}/${path}.mp3`,
      }).promise.then(r => {
        console.log(r, 'rrrr');
        console.log(`${RNFS.DocumentDirectoryPath}`, 'path');
      });
    }
  }, [songplaying]);

  const readFile = useCallback(async () => {
    // const file = await RNFS.read(`file://${RNFS.MainBundlePath}`);
    // console.log(file, 'anhduy dep trai');
    RNFS.readDir(RNFS.DocumentDirectoryPath)
      .then(result => {
        console.log('Got result', result);
        // SoundPlayer.playUrl('file://' + result[0].path);
      })
      .catch(err => {
        console.log(err.message, err.code);
      });
  }, []);

  useEffect(() => {
    readFile();
  }, [readFile]);

  return (
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
      <BaseRight style={[style.leftStyle]}>
        <TouchableOpacity style={style.showBack} onPress={handleDownload}>
          <Image
            style={style.download}
            source={require('../../../assets/images/download.png')}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </BaseRight>
    </Header>
  );
};

const style = StyleSheet.create({
  hasBorder: {
    borderBottomWidth: 0.333,
    borderBottomColor: '#a7a6ab',
  },
  headerStyle: {
    height: 77,
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    elevation: 0,
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
  download: {
    width: 20,
    height: 20,
    tintColor: 'white',
  },
});

export default DisplayMusicHeader;

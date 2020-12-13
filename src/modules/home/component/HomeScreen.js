import React, {useCallback, useEffect, useMemo, Fragment} from 'react';
import {View, ScrollView} from 'react-native';
import {withNavigation} from 'react-navigation';
import {useSelector, useDispatch} from 'react-redux';
import {actions as homeAction} from '@modules/home/store';
import DisplayMusicMini from '@components/layout/DisplayMusicMini';
import BannerList from './BannerList';
import ListTop from './ListTop';
import RNFS from 'react-native-fs';
import SoundPlayer from 'react-native-sound-player';

const HomeScreen = ({navigation}) => {
  const {songplaying} = useSelector(state => state.storage);
  const {likeSong} = useSelector(state => state.home);
  const {display} = useSelector(state => state.musicdisplay);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(homeAction.fetchListBanner());
    dispatch(homeAction.fetchListTop());
  }, [dispatch, navigation]);

  useEffect(() => {
    const didFocus = navigation.addListener('didFocus', () => {
      dispatch(homeAction.setStatusLike(false));
      if (likeSong == true) {
        dispatch(homeAction.fetchListTop());
      }
    });

    return () => {
      didFocus.remove();
    };
  }, [dispatch, likeSong, navigation]);

  useEffect(() => {
    // RNFS.downloadFile({
    //   background: true,
    //   fromUrl:
    //     'https://aredir.nixcdn.com/NhacCuaTui991/EmMuonTaLaGi-ThanhHungIdol-6119801.mp3?st=gbBh8Vb3HDwiBPA7A05Fxg&e=1577438119',
    //   toFile: `${RNFS.DocumentDirectoryPath}/anhduy.mp3`,
    // }).promise.then(r => {
    //   console.log(r, 'rrrr');
    //   console.log(`${RNFS.DocumentDirectoryPath}`, 'path');
    // });
  }, []);

  const readFile = useCallback(async () => {
    // const file = await RNFS.read(`file://${RNFS.MainBundlePath}`);
    // console.log(file, 'anhduy dep trai');
    RNFS.readDir(RNFS.DocumentDirectoryPath)
      .then(result => {
        console.log('Got result', result);
        // SoundPlayer.playUrl('file://' + result[0].path);
        return Promise.all([RNFS.stat(result[0].path), result[0].path]);
      })
      .then(statResult => {
        console.log('stat result', statResult);
        if (statResult[0].isFile()) {
          return RNFS.readFile(statResult[1], 'utf8');
        }
        return 'no file';
      })
      .then(contents => {
        console.log('Got Contents', contents);
      })
      .catch(err => {
        console.log(err.message, err.code);
      });
  }, []);

  useEffect(() => {
    // readFile();
  }, [readFile]);

  return (
    <Fragment>
      <View style={{flex: 1}}>
        <ScrollView>
          <BannerList />
          <ListTop navigation={navigation} />
        </ScrollView>
        {useMemo(() => songplaying && <DisplayMusicMini />, [songplaying])}
      </View>
    </Fragment>
  );
};

export default withNavigation(HomeScreen);

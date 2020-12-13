import React, {
  useCallback,
  useEffect,
  useState,
  useMemo,
  Fragment,
} from 'react';
import {TouchableOpacity, View, Image, StyleSheet, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import SoundPlayer from 'react-native-sound-player';
import {actions as storageAction} from '@modules/storage/store';
import {actions as displaymusicAction} from '@modules/displaymusic/store';

const ButtonDisplay = ({navigation, displayMusicScreen}) => {
  const {songplaying} = useSelector(state => state.storage);
  const {
    seekSeconds,
    navigateDisplay,
    display,
    onChangeSeconds,
    isPause,
  } = useSelector(state => state.musicdisplay);
  const {datalistTop} = useSelector(state => state.home);
  const {listMySong} = useSelector(state => state.mysong);

  const dispatch = useDispatch();
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    if (navigateDisplay === 'Play' && display === true) {
      try {
        songplaying.link && SoundPlayer.playUrl(songplaying.link);
        SoundPlayer.onFinishedPlaying(() => {
          dispatch(displaymusicAction.setDisplay(false));
        });
        dispatch(displaymusicAction.setSeekSeconds(0));
        setSeconds(0);
        dispatch(displaymusicAction.setNavigate(' '));
      } catch (e) {}
    }
  }, [dispatch, display, navigateDisplay, songplaying.link]);

  useEffect(() => {
    if (!!isPause && display === true) {
      SoundPlayer.pause();
    }
  }, [display, isPause]);

  useEffect(() => {
    if (display === true) {
      try {
        const se = Number((seconds * seekSeconds).toFixed(0));
        if (se > 0 && onChangeSeconds === true) {
          dispatch(displaymusicAction.setChangeSeconds(false));
          SoundPlayer.seek(se);
        }
        if (display === true) SoundPlayer.resume();
        dispatch(displaymusicAction.setPause(false));
      } catch (e) {}
    }
  }, [
    seekSeconds,
    seconds,
    onChangeSeconds,
    display,
    dispatch,
    navigateDisplay,
  ]);

  const _getInfo = useCallback(async () => {
    try {
      const info = await SoundPlayer.getInfo();
      setSeconds(info.duration);
    } catch (e) {}
  }, []);
  useEffect(() => {
    if (display === true) {
      _getInfo();
    }
  }, [_getInfo, display]);

  const _currentTime = useCallback(async () => {
    try {
      const info = await SoundPlayer.getInfo();
      dispatch(
        displaymusicAction.setValueSlider(info.currentTime / info.duration),
      );

      dispatch(displaymusicAction.setSeconds(info.duration));
    } catch (e) {}
  }, [dispatch]);

  useEffect(() => {
    if (display === true) {
      setInterval(function() {
        _currentTime();
      }, 1000);
    }
  }, [_currentTime, display]);

  const _setdisplay = useCallback(async () => {
    if (display === undefined) {
      dispatch(displaymusicAction.setDisplay(true));
      songplaying.link && SoundPlayer.playUrl(songplaying.link);
    }
    dispatch(displaymusicAction.setDisplay(!display));
    try {
      if (display === true) {
        SoundPlayer.pause();
        dispatch(displaymusicAction.setPause(true));
      } else {
        const info = await SoundPlayer.getInfo();
        if (info.currentTime / info.duration === 1) {
          SoundPlayer.seek(0);
        }
        dispatch(displaymusicAction.setPause(false));
        SoundPlayer.resume();
      }
    } catch (e) {}
  }, [dispatch, display, songplaying.link]);

  const next_prev = useCallback(
    status => {
      let data;
      if (songplaying && songplaying.type_audio) {
        data = listMySong;
      } else {
        data = datalistTop;
      }
      const indexItem = data.reduce((newobject, item, index) => {
        if (songplaying.link === item.link) {
          let anh = status === 'next' ? index + 1 : index - 1;
          newobject = data[anh];
        }
        return newobject;
      }, {});
      if (indexItem) {
        songplaying.link && SoundPlayer.playUrl(indexItem.link);
        dispatch(displaymusicAction.setPause(false));
        dispatch(storageAction.setSongPlaying(indexItem));
        dispatch(displaymusicAction.setDisplay(true));
      }
    },
    [datalistTop, dispatch, listMySong, songplaying],
  );

  return (
    <Fragment>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            next_prev('prev');
          }}>
          <Image
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              width: displayMusicScreen ? 30 : 13,
              height: displayMusicScreen ? 25 : 13,
              tintColor: displayMusicScreen ? 'white' : 'black',
            }}
            source={require('../../assets/images/prev.png')}
            resizeMode="stretch"
          />
        </TouchableOpacity>
        {useMemo(
          () => (
            <TouchableOpacity onPress={_setdisplay}>
              <Image
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  width: displayMusicScreen ? 50 : 25,
                  height: displayMusicScreen ? 50 : 25,
                  tintColor: displayMusicScreen ? 'white' : 'black',
                }}
                source={
                  display === true
                    ? require('../../assets/images/pause.png')
                    : require('../../assets/images/play.png')
                }
              />
            </TouchableOpacity>
          ),
          [_setdisplay, display, displayMusicScreen],
        )}

        <TouchableOpacity
          onPress={() => {
            next_prev('next');
          }}>
          <Image
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              width: displayMusicScreen ? 30 : 13,
              height: displayMusicScreen ? 25 : 13,
              tintColor: displayMusicScreen ? 'white' : 'black',
            }}
            source={require('../../assets/images/next.png')}
            resizeMode="stretch"
          />
        </TouchableOpacity>
      </View>
    </Fragment>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    minWidth: '25%',
  },
});

export default ButtonDisplay;

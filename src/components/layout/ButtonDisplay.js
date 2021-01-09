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
import FavoriteIcon from '@assets/svg/FavoriteIcon';
import {actions as homeAction} from '@modules/home/store';

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
  const [status, setStatus] = useState(false);
  const [isReplay, setIsReplay] = useState(false);
  const {isLogged} = useSelector(state => state.storage);

  useEffect(() => {
    if (songplaying && songplaying.statusLike) {
      setStatus(songplaying.statusLike);
    }
  }, [songplaying]);

  const dispatch = useDispatch();
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    if (navigateDisplay === 'Play' && display === true) {
      try {
        SoundPlayer.playUrl(songplaying.link);
        SoundPlayer.onFinishedPlaying(() => {
          dispatch(displaymusicAction.setDisplay(false));
          // if (!!isReplay) {
          //   dispatch(displaymusicAction.setDisplay(true));
          //   SoundPlayer.playUrl(songplaying.link);
          // }
        });
        dispatch(displaymusicAction.setSeekSeconds(0));
        setSeconds(0);
        dispatch(displaymusicAction.setNavigate(' '));
      } catch (e) {}
    }
  }, [dispatch, display, isReplay, navigateDisplay, songplaying.link]);

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
      try {
        dispatch(displaymusicAction.setDisplay(true));
        SoundPlayer.playUrl(songplaying.link);
      } catch (error) {}
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
        if (songplaying._id === item._id) {
          let currentIndex = status === 'next' ? index + 1 : index - 1;
          newobject = data[currentIndex];
        }
        return newobject;
      }, {});
      if (indexItem && indexItem.link) {
        console.log('link', indexItem.link);
        try {
          SoundPlayer.playUrl(indexItem.link);
          dispatch(displaymusicAction.setPause(false));
          dispatch(storageAction.setSongPlaying(indexItem));
          dispatch(displaymusicAction.setDisplay(true));
        } catch (error) {}
      } else {
        if (data[0] && data[0].link) {
          console.log('link', data[0].link);
          try {
            SoundPlayer.playUrl(data[0].link);
            dispatch(displaymusicAction.setPause(false));
            dispatch(storageAction.setSongPlaying(data[0]));
            dispatch(displaymusicAction.setDisplay(true));
          } catch (error) {}
        }
      }
    },
    [datalistTop, dispatch, listMySong, songplaying],
  );

  const likeSong = useCallback(
    item => {
      dispatch(homeAction.likeSong(item));
      setStatus(!status);
    },
    [dispatch, status],
  );

  const rePlay = useCallback(() => {
    setIsReplay(!isReplay);
  }, [isReplay]);

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
        {useMemo(
          () =>
            displayMusicScreen && (
              <TouchableOpacity
                style={{position: 'absolute', left: 0}}
                onPress={rePlay}>
                <Image
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{
                    width: displayMusicScreen ? 30 : 13,
                    height: displayMusicScreen ? 25 : 13,
                    tintColor: isReplay ? '#800080' : 'white',
                  }}
                  source={require('../../assets/images/replay.png')}
                  resizeMode="stretch"
                />
              </TouchableOpacity>
            ),
          [displayMusicScreen, isReplay, rePlay],
        )}

        {displayMusicScreen && isLogged && !songplaying.type_audio && (
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: 0,
              width: displayMusicScreen ? 30 : 13,
              height: displayMusicScreen ? 25 : 13,
            }}
            onPress={() => {
              likeSong(songplaying);
            }}>
            <FavoriteIcon isLiked={status} />
          </TouchableOpacity>
        )}
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

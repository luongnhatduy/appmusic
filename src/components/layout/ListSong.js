import React, {
  useCallback,
  useEffect,
  Fragment,
  useMemo,
  useState,
} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  Image,
  StyleSheet,
} from 'react-native';
const screenWidth = Dimensions.get('window').width;
import {useSelector, useDispatch} from 'react-redux';
import NavigationService from '@utils/NavigationService';
import {actions as storageAction} from '@modules/storage/store';
import {actions as displaymusicAction} from '@modules/displaymusic/store';
import {actions as homeAction} from '@modules/home/store';
import FavoriteIcon from '@assets/svg/FavoriteIcon';
import {actions as favoriteAction} from '@modules/favorite/store';
import {actions as mysongAction} from '@modules/mysong/store';

const ListSong = ({navigation, item, index, favorite}) => {
  const [status, setStatus] = useState(false);
  const {listFavorite, isLogged} = useSelector(state => state.storage);
  const dispatch = useDispatch();

  useEffect(() => {
    listFavorite.forEach(i => {
      if (i._id == item._id) {
        setStatus(true);
      }
    });
  }, [item, item.id, listFavorite]);

  useEffect(() => {
    setStatus(item.statusLike && !!item.statusLike ? true : false);
  }, [item]);

  const displaymusic = useCallback(
    item => {
      if (item && item.type && item.type === 'video') {
        NavigationService.navigate('PlayVideoScreen', item);
        dispatch(displaymusicAction.setPause(true));
        return;
      }
      dispatch(displaymusicAction.setPause(false));
      dispatch(storageAction.setSongPlaying(item));
      dispatch(displaymusicAction.setDisplay(true));
      dispatch(displaymusicAction.setNavigate('Play'));
      NavigationService.navigate('DisplayMusicScreen');
    },
    [dispatch],
  );

  const likeSong = useCallback(
    item => {
      dispatch(homeAction.likeSong(item));
      setStatus(!status);
      // favorite && dispatch(homeAction.setStatusLike(true));
    },
    [dispatch, status],
  );

  const deleteFile = useCallback(
    item => {
      dispatch(mysongAction.deleteFile(item));
    },
    [dispatch],
  );
  return (
    <Fragment>
      <View style={styles.viewItem}>
        {useMemo(
          () => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                displaymusic(item);
              }}>
              {!favorite ? (
                <Text style={styles.txtItem}>{index + 1}</Text>
              ) : (
                <View />
              )}

              <Image
                source={
                  !item.img
                    ? require('../../assets/images/default-img.jpg')
                    : {uri: item.img}
                }
                style={styles.imgItem}
              />

              <View>
                <Text
                  style={[
                    styles.txtItem,
                    {color: !favorite ? 'white' : 'black'},
                  ]}>
                  {item.name_song}
                </Text>
                <Text style={styles.txtItem}>{item.name_singer}</Text>
              </View>
            </TouchableOpacity>
          ),
          [displaymusic, favorite, index, item],
        )}

        {useMemo(
          () => (
            <View>
              {item.type === 'audio' && item.img && (
                <TouchableOpacity
                  style={{marginRight: !favorite ? 15 : 0}}
                  onPress={() => {
                    likeSong(item);
                  }}>
                  {!!isLogged && <FavoriteIcon isLiked={status} />}
                </TouchableOpacity>
              )}

              {item.type === 'audio' && !item.img && (
                <TouchableOpacity
                  style={{marginRight: !favorite ? 15 : 0}}
                  onPress={() => {
                    deleteFile(item);
                  }}>
                  <Image
                    style={styles.mv}
                    resizeMode="contain"
                    source={require('@assets/images/delete.png')}
                  />
                </TouchableOpacity>
              )}

              {item.type === 'video' && (
                <Image
                  style={styles.mv}
                  resizeMode="contain"
                  source={require('@assets/images/mv.png')}
                />
              )}
            </View>
          ),
          [deleteFile, favorite, isLogged, item, likeSong, status],
        )}
      </View>
    </Fragment>
  );
};
const styles = StyleSheet.create({
  viewItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: screenWidth * 0.95,
  },
  imgItem: {
    width: 25,
    height: 25,
    borderRadius: 5,
  },
  mv: {
    height: 20,
    width: 20,
    marginRight: 2,
  },
  txtItem: {
    marginLeft: 10,
    marginRight: 10,
    color: '#B5B5B5',
    minWidth: 15,
  },
  item: {
    flex: 1,
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
  },
});

export default ListSong;

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

const ListSong = ({navigation, item, index, favorite}) => {
  const [status, setStatus] = useState(false);
  const {listFavorite} = useSelector(state => state.storage);
  const dispatch = useDispatch();

  useEffect(() => {
    listFavorite.forEach(i => {
      if (i._id == item._id) {
        setStatus(true);
      }
    });
  }, [item, item.id, listFavorite]);

  const displaymusic = useCallback(
    item => {
      dispatch(storageAction.setSongPlaying(item));
      dispatch(displaymusicAction.setDisplay(true));
      dispatch(displaymusicAction.setNavigate('Play'));
      NavigationService.navigate('DisplayMusicScreen');
    },
    [dispatch],
  );

  const likeSong = useCallback(
    item => {
      dispatch(storageAction.likeSong(item));
      setStatus(!status);
      favorite && dispatch(homeAction.setStatusLike(true));
    },
    [dispatch, status],
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
              <Image source={{uri: item.img}} style={styles.imgItem} />
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
            <TouchableOpacity
              style={{marginRight: !favorite ? 15 : 0}}
              onPress={() => {
                likeSong(item);
              }}>
              <FavoriteIcon isLiked={status} />
            </TouchableOpacity>
          ),
          [favorite, item, likeSong, status],
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
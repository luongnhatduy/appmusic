import React, {
  useCallback,
  useEffect,
  useState,
  Fragment,
  useMemo,
} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  Dimensions,
  Image,
  StyleSheet,
  FlatList,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {useSelector, useDispatch} from 'react-redux';
import {actions as displaymusicAction} from '@modules/displaymusic/store';
import {actions as storageAction} from '@modules/storage/store';
import ListSong from '@components/layout/ListSong';

import NavigationService from '@utils/NavigationService';

const screenWidth = Dimensions.get('window').width;

const ListSearch = ({navigation}) => {
  const dispatch = useDispatch();

  const {listSearch} = useSelector(state => state.search);

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

  const renderItem = ({item, index}) => (
    <ListSong item={item} index={index} favorite />
  );

  return (
    <Fragment>
      {useMemo(
        () => (
          <FlatList
            data={listSearch}
            keyExtractor={(item, index) => index.toString()}
            style={{flex: 1, marginBottom: 40}}
            // eslint-disable-next-line no-undef
            renderItem={renderItem}
          />
        ),
        [listSearch],
      )}
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
  item: {
    flex: 1,
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
  },
  txtItem: {
    marginLeft: 10,
    marginRight: 10,
    color: '#B5B5B5',
    minWidth: 15,
  },
});

export default ListSearch;

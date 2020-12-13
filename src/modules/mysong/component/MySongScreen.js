import React, {useEffect, Fragment, useMemo} from 'react';
import {View, FlatList, Text} from 'react-native';
import {withNavigation} from 'react-navigation';
import {actions as favoriteAction} from '@modules/favorite/store';
import {useSelector, useDispatch} from 'react-redux';
import ListSong from '@components/layout/ListSong';
import DisplayMusicMini from '@components/layout/DisplayMusicMini';
import {actions as mysongAction} from '@modules/mysong/store';

const MySongScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {songplaying, listFavorite} = useSelector(state => state.storage);
  const {listMySong} = useSelector(state => state.mysong);
  const {display} = useSelector(state => state.musicdisplay);

  const renderItem = ({item, index}) => (
    <ListSong item={item} index={index} mysong favorite />
  );

  useEffect(() => {
    dispatch(mysongAction.fetchListMySong());
  }, [dispatch]);

  useEffect(() => {
    const didFocus = navigation.addListener('didFocus', () => {
      dispatch(mysongAction.fetchListMySong());
    });

    return () => {
      didFocus.remove();
    };
  }, [dispatch, navigation]);

  return (
    <Fragment>
      {useMemo(
        () => (
          <FlatList
            data={listMySong}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
          />
        ),
        [listMySong],
      )}
      {useMemo(() => songplaying && <DisplayMusicMini />, [
        songplaying,
        display,
      ])}
    </Fragment>
  );
};

export default withNavigation(MySongScreen);

import React, {useEffect, Fragment, useMemo} from 'react';
import {View, FlatList} from 'react-native';
import {withNavigation} from 'react-navigation';
import {actions as favoriteAction} from '@modules/favorite/store';
import {useSelector, useDispatch} from 'react-redux';
import ListSong from '@components/layout/ListSong';
import DisplayMusicMini from '@components/layout/DisplayMusicMini';

const FavoriteScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {songplaying, listFavorite} = useSelector(state => state.storage);
  const {display} = useSelector(state => state.musicdisplay);
  const renderItem = ({item, index}) => (
    <ListSong item={item} index={index} favorite />
  );

  return (
    <Fragment>
      {useMemo(
        () => (
          <FlatList
            data={listFavorite}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
          />
        ),
        [listFavorite],
      )}
      {useMemo(() => songplaying && <DisplayMusicMini />, [
        songplaying,
        display,
      ])}
    </Fragment>
  );
};

export default withNavigation(FavoriteScreen);

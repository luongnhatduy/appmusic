import React, {useEffect, Fragment, useMemo} from 'react';
import {View, FlatList, ActivityIndicator} from 'react-native';
import {withNavigation} from 'react-navigation';
import {actions as favoriteAction} from '@modules/favorite/store';
import {useSelector, useDispatch} from 'react-redux';
import ListSong from '@components/layout/ListSong';
import DisplayMusicMini from '@components/layout/DisplayMusicMini';

const FavoriteScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {songplaying} = useSelector(state => state.storage);
  const {favoriteList} = useSelector(state => state.favorite);
  const {display} = useSelector(state => state.musicdisplay);

  useEffect(() => {
    dispatch(favoriteAction.fetchListFavorite());
  }, [dispatch]);

  const renderItem = ({item, index}) => (
    <ListSong item={item} index={index} favorite />
  );

  return (
    <Fragment>
      {useMemo(
        () =>
          favoriteList.length > 0 ? (
            <FlatList
              data={favoriteList}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItem}
            />
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator size="large" color="#990099" style={{}} />
            </View>
          ),
        [favoriteList],
      )}
      {useMemo(() => songplaying && <DisplayMusicMini />, [
        songplaying,
        display,
      ])}
    </Fragment>
  );
};

export default withNavigation(FavoriteScreen);

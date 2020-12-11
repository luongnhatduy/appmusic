import React, {useCallback, useEffect, useMemo, Fragment} from 'react';
import {View, ScrollView} from 'react-native';
import {withNavigation} from 'react-navigation';
import {useSelector, useDispatch} from 'react-redux';
import {actions as homeAction} from '@modules/home/store';
import DisplayMusicMini from '@components/layout/DisplayMusicMini';
import BannerList from './BannerList';
import ListTop from './ListTop';

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

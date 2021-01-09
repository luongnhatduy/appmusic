import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  Fragment,
} from 'react';
import {View, ScrollView, RefreshControl} from 'react-native';
import {withNavigation} from 'react-navigation';
import {useSelector, useDispatch} from 'react-redux';
import {actions as homeAction} from '@modules/home/store';
import DisplayMusicMini from '@components/layout/DisplayMusicMini';
import BannerList from './BannerList';
import ListTop from './ListTop';

const HomeScreen = ({navigation}) => {
  const {songplaying} = useSelector(state => state.storage);
  const {likeSong} = useSelector(state => state.home);
  const [refreshing, setRefreshing] = useState(false);
  const {display} = useSelector(state => state.musicdisplay);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(homeAction.fetchListBanner());
    dispatch(homeAction.fetchListCategory());
  }, [dispatch, navigation]);

  const onRefresh = useCallback(async () => {
    dispatch(homeAction.fetchListBanner());
    dispatch(homeAction.fetchListCategory());
  }, [dispatch]);

  return (
    <Fragment>
      <View style={{flex: 1}}>
        {useMemo(
          () => (
            <ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl refreshing={false} onRefresh={onRefresh} />
              }>
              <BannerList />
              <ListTop navigation={navigation} />
            </ScrollView>
          ),
          [navigation, onRefresh],
        )}

        {useMemo(() => songplaying && <DisplayMusicMini />, [songplaying])}
      </View>
    </Fragment>
  );
};

export default withNavigation(HomeScreen);

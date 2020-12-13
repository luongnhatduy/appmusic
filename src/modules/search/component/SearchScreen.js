import React, {useCallback, useEffect, useMemo, Fragment} from 'react';
import {View, ScrollView} from 'react-native';
import {withNavigation} from 'react-navigation';
import {useSelector, useDispatch} from 'react-redux';
import {actions as searchAction} from '@modules/search/store';
import DisplayMusicMini from '@components/layout/DisplayMusicMini';
import ListSearch from './ListSearch';
const SearchScreen = ({navigation}) => {
  const {songplaying} = useSelector(state => state.storage);
  const {display} = useSelector(state => state.musicdisplay);

  const dispatch = useDispatch();
  useEffect(() => {}, [dispatch]);

  return (
    <Fragment>
      <View style={{flex: 1}}>
        <ListSearch />
        {/* {useMemo(() => songplaying && <DisplayMusicMini />, [
          songplaying,
          display,
        ])} */}
      </View>
    </Fragment>
  );
};

export default withNavigation(SearchScreen);

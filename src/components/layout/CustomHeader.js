import React, {useCallback, useMemo, Fragment} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import {Header, Left as BaseLeft, Body, Right as BaseRight} from 'native-base';
import i18n from '@i18n';
import SearchIcon from '@assets/svg/SearchIcon';
import NavigationService from '../../utils/NavigationService';
import {actions as displaymusicAction} from '@modules/displaymusic/store';
import {actions as searchAction} from '@modules/search/store';

import {useSelector, useDispatch} from 'react-redux';

const style = StyleSheet.create({
  hasBorder: {
    borderBottomWidth: 0.333,
    borderBottomColor: '#a7a6ab',
  },
  headerStyle: {
    height: 77,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 0,
  },
  leftStyle: {
    flex: 0,
    width: '9%',
  },
  contentStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightStyle: {
    flex: 0,
    width: '9%',
  },
  showBack: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 5,
  },
  textShowBack: {
    color: '#828282',
    marginLeft: 6,
    marginBottom: 0,
    fontSize: 15,
  },
  iconBack: {color: '#828282', fontSize: 20},
  titleSearch: {
    fontSize: 15,
    color: '#AAAAAA',
  },
  buttonSearch: {
    padding: 7,
    borderRadius: 50,
    width: '97%',
    backgroundColor: '#F4F4F4',
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtcancel: {
    fontSize: 16,
    color: '#990099',
  },
  viewHeader: {
    width: '100%',
    flexDirection: 'row',
  },
  searchBarFullWidthInput: {
    height: '100%',
    flex: 1,
    padding: 0,
    marginLeft: 12,
  },
  avt: {
    width: 35,
    height: 35,
    borderRadius: 40,
  },
  avtDefault: {
    width: 35,
    height: 35,
    borderRadius: 40,
    tintColor: 'gray',
  },
});

const CustomHeader = ({search}) => {
  const dispatch = useDispatch();
  const {dataProfile, isLogged} = useSelector(state => state.storage);

  const _search = useCallback(() => {
    if (!search) {
      NavigationService.navigate('SearchScreen');
      dispatch(searchAction.setListSearch([]));
    }
  }, [dispatch, search]);

  const cancel = useCallback(() => {
    NavigationService.goBack();
  }, []);
  const searchKeyword = useCallback(
    txt => {
      dispatch(searchAction.searchKey(txt));
    },
    [dispatch],
  );

  const _gotoProfile = useCallback(() => {
    NavigationService.navigate('ProfileScreen');
  }, []);
  const headerSearch = useMemo(
    () => (
      <View style={style.viewHeader}>
        <Body style={style.contentStyle}>
          <View onPress={_search} style={style.buttonSearch}>
            <SearchIcon fill={'#AAAAAA'} />
            {/* <Text style={style.titleSearch}></Text> */}
            <TextInput
              autoCapitalize={'none'}
              autoCompleteType={'off'}
              autoCorrect={false}
              importantForAutofill={'no'}
              placeholder={i18n.t('common.titleSearch')}
              placeholderTextColor="#AAAAAA"
              style={style.searchBarFullWidthInput}
              // onKeyPress={({nativeEvent}) => pressKeyboardEvent(nativeEvent)}
              onChangeText={text => searchKeyword(text)}
              autoFocus={true}
              returnKeyType={'done'}
            />
          </View>
        </Body>
        <BaseRight style={[style.rightStyle]}>
          <TouchableOpacity onPress={cancel}>
            <Text style={style.txtcancel}>Huỷ</Text>
          </TouchableOpacity>
        </BaseRight>
      </View>
    ),
    [_search, cancel, searchKeyword],
  );
  const header = useMemo(
    () => (
      <View style={style.viewHeader}>
        <BaseLeft style={[style.leftStyle]}>
          <TouchableOpacity onPress={_gotoProfile}>
            {isLogged && dataProfile && dataProfile.urlImg ? (
              <Image
                style={style.avt}
                source={{
                  uri: dataProfile.urlImg,
                }}
              />
            ) : (
              <Image
                style={style.avtDefault}
                source={require('@assets/images/profile-user.png')}
              />
            )}
          </TouchableOpacity>
        </BaseLeft>
        <Body style={style.contentStyle}>
          <TouchableOpacity onPress={_search} style={style.buttonSearch}>
            <SearchIcon fill={'#AAAAAA'} />
            <Text style={style.titleSearch}>
              {i18n.t('common.titleSearch')}
            </Text>
          </TouchableOpacity>
        </Body>
      </View>
    ),
    [_gotoProfile, _search, dataProfile, isLogged],
  );
  return (
    <Fragment>
      {useMemo(
        () => (
          <Header
            iosBarStyle="dark-content"
            backgroundColor="white"
            androidStatusBarColor="white"
            style={style.headerStyle}>
            {search ? headerSearch : header}
          </Header>
        ),
        [header, headerSearch, search],
      )}
    </Fragment>
  );
};

export default CustomHeader;

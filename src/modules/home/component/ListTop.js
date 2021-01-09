import React, {
  Fragment,
  useEffect,
  useCallback,
  useState,
  useMemo,
} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  StyleSheet,
  ImageBackground,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import ListSong from '@components/layout/ListSong';
import {actions as homeAction} from '@modules/home/store';

const screenWidth = Dimensions.get('window').width;
const ListTop = ({navigation}) => {
  const {datalistTop, categories} = useSelector(state => state.home);
  const [seeMore, setSeeMore] = useState(false);
  const [isSelected, setIsSelected] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (categories.length > 0) {
      setIsSelected(0);
    }
  }, [categories, categories.length]);

  const _setSeeMore = useCallback(() => {
    setSeeMore(!seeMore);
  }, [seeMore, setSeeMore]);

  const selectCategory = useCallback(
    (item, index) => {
      setIsSelected(index);
      dispatch(homeAction.fetchListTop(item));
    },
    [dispatch],
  );
  return (
    <Fragment>
      <View style={styles.container}>
        <View style={styles.contai}>
          <Text style={styles.title}>Top bài hát &gt;</Text>

          {useMemo(
            () => (
              <FlatList
                style={styles.listCategory}
                horizontal
                data={categories}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => (
                  <View style={styles.category}>
                    <TouchableOpacity
                      onPress={() => {
                        selectCategory(item, index);
                      }}
                      style={[
                        styles.itemCategory,
                        {backgroundColor: item.bgColor},
                      ]}>
                      <Text style={styles.txtnameCategory}>{item.name}</Text>
                    </TouchableOpacity>
                    <View
                      style={[
                        styles.baseTop,
                        {
                          borderTopColor:
                            isSelected === index ? item.bgColor : 'transparent',
                        },
                      ]}
                    />
                  </View>
                )}
              />
            ),
            [categories, isSelected, selectCategory],
          )}
        </View>

        {useMemo(
          () =>
            datalistTop.length > 0 && (
              <ImageBackground
                source={require('../../../assets/images/backgroundimg.jpg')}
                style={datalistTop.length == 0 ? styles.bg : styles.imgbg}
                imageStyle={styles.img}>
                <FlatList
                  data={
                    seeMore === false ? datalistTop.slice(0, 10) : datalistTop
                  }
                  keyExtractor={(item, index) => index.toString()}
                  style={{marginTop: 10}}
                  renderItem={({item, index}) => (
                    <ListSong item={item} index={index} />
                  )}
                />
                <TouchableOpacity style={styles.seemore} onPress={_setSeeMore}>
                  <Text style={{color: 'white'}}>
                    {seeMore == true ? 'Thu gọn >' : 'Xem thêm >'}
                  </Text>
                </TouchableOpacity>
              </ImageBackground>
            ),
          [_setSeeMore, datalistTop, seeMore],
        )}

        {useMemo(
          () =>
            datalistTop.length === 0 && (
              <ActivityIndicator
                size="large"
                color="#990099"
                style={{marginTop: 10}}
              />
            ),
          [datalistTop],
        )}
      </View>
    </Fragment>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 35,
  },
  contai: {
    width: '100%',
    paddingHorizontal: 15,
  },
  baseTop: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  category: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  listCategory: {
    marginTop: 10,
  },
  itemCategory: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'red',
    borderRadius: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    fontStyle: 'italic',
  },
  imgbg: {
    width: screenWidth * 0.95,
    marginTop: 10,
    borderRadius: 40,
  },
  img: {
    borderRadius: 5,
  },
  seemore: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    paddingBottom: 20,
  },
  bg: {
    height: 0,
    width: screenWidth * 0.95,
  },
  txtnameCategory: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ListTop;

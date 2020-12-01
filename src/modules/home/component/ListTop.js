import React, {Fragment, useCallback, useState, useMemo} from 'react';
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
const screenWidth = Dimensions.get('window').width;
const ListTop = ({navigation}) => {
  const {datalistTop} = useSelector(state => state.home);
  const [seeMore, setSeeMore] = useState(false);

  const renderItem = ({item, index}) => <ListSong item={item} index={index} />;

  const _setSeeMore = useCallback(() => {
    setSeeMore(!seeMore);
  }, [seeMore, setSeeMore]);
  return (
    <Fragment>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>BẢNG XẾP HẠNG ></Text>
          <ImageBackground
            source={require('../../../assets/images/backgroundimg.jpg')}
            style={datalistTop.length == 0 ? styles.bg : styles.imgbg}
            imageStyle={styles.img}>
            {useMemo(
              () => (
                <FlatList
                  data={
                    seeMore == false ? datalistTop.slice(0, 10) : datalistTop
                  }
                  keyExtractor={(item, index) => index.toString()}
                  style={{flex: 1, flexDirection: 'row', marginTop: 10}}
                  renderItem={renderItem}
                />
              ),
              [datalistTop, seeMore],
            )}

            {useMemo(
              () =>
                datalistTop.length > 0 && (
                  <TouchableOpacity
                    style={styles.seemore}
                    onPress={_setSeeMore}>
                    <Text style={{color: 'white'}}>
                      {seeMore == true ? 'Thu gọn >' : 'Xem thêm >'}
                    </Text>
                  </TouchableOpacity>
                ),
              [_setSeeMore, datalistTop.length, seeMore],
            )}
          </ImageBackground>

          {useMemo(
            () =>
              datalistTop.length == 0 && (
                <ActivityIndicator
                  size="large"
                  color="#990099"
                  style={{marginTop: 10}}
                />
              ),
            [datalistTop],
          )}
        </View>
      </View>
    </Fragment>
  );
};
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 35,
  },
  title: {
    fontSize: 16,
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
});

export default ListTop;
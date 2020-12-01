import React, {useCallback, useEffect, useState} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  Dimensions,
  Image,
  StyleSheet,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {useSelector, useDispatch} from 'react-redux';

const BannerList = ({navigation}) => {
  const {bannerList} = useSelector(state => state.home);

  const sliderWidth = Dimensions.get('window').width;
  const [nowBannerIndex, setNowBannerIndex] = useState(0);

  const _renderItem = ({item, index}) => {
    return (
      <Image
        style={{width: sliderWidth, height: sliderWidth * 0.45}}
        resizeMode="stretch"
        source={{uri: item.img}}
      />
    );
  };
  return (
    <View>
      <Carousel
        // ref={c => {
        //   this._carousel = c;
        // }}
        data={bannerList}
        renderItem={_renderItem}
        sliderWidth={sliderWidth}
        itemWidth={sliderWidth}
        autoplay={true}
        loop={true}
        autoplayDelay={1000}
        lockScrollWhileSnapping={true}
        scrollEnabled={true}
        inactiveSlideScale={1}
        inactiveSlideOpacity={0.2}
        onSnapToItem={index => setNowBannerIndex(index)}
      />
      <Pagination
        dotsLength={bannerList.length}
        activeDotIndex={nowBannerIndex}
        containerStyle={styles.containerStyle}
        dotStyle={styles.dotStyle}
        dotContainerStyle={{marginHorizontal: 4}}
        inactiveDotStyle={styles.inactiveDotStyle}
        inactiveDotScale={1}
        inactiveDotOpacity={1}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  containerStyle: {
    paddingVertical: 10,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  dotStyle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'white',
  },
  inactiveDotStyle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#B6B6B6',
  },
});

export default BannerList;

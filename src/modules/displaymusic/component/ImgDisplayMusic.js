import React, {
  useMemo,
  useEffect,
  useState,
  Fragment,
  useCallback,
} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  Dimensions,
  Image,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
const screenWidth = Dimensions.get('window').width;
import {useSelector, useDispatch} from 'react-redux';

const ImgDisplayMusic = ({navigation, item}) => {
  const [rotateValue, setRotateValue] = useState(new Animated.Value(0));

  const StartImageRotate = useCallback(() => {
    rotateValue.setValue(0);

    Animated.timing(rotateValue, {
      toValue: 1,
      duration: 20000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => StartImageRotate());
  }, [rotateValue]);

  const RotateData = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  useEffect(() => {
    StartImageRotate();
  }, [StartImageRotate]);

  return (
    <Fragment>
      {useMemo(
        () => (
          <View style={[styles.container]}>
            <Animated.Image
              source={
                !item.img
                  ? require('../../../assets/images/default-img.jpg')
                  : {uri: item.img}
              }
              style={[styles.imgItem, {transform: [{rotate: RotateData}]}]}
            />
          </View>
        ),
        [RotateData, item.img],
      )}
    </Fragment>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  imgItem: {
    width: screenWidth * 0.7,
    height: screenWidth * 0.7,
    borderRadius: screenWidth * 0.35,
  },
});

export default ImgDisplayMusic;

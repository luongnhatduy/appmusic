import React, {useMemo, useEffect, useState, Fragment} from 'react';
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

const ImgDisplayMusic = ({navigation, item}) => {
  const [rotateValue, setRotateValue] = useState(new Animated.Value(0));
  useEffect(() => {
    StartImageRotate();
  }, []);

  function StartImageRotate() {
    rotateValue.setValue(0);

    Animated.timing(rotateValue, {
      toValue: 1,
      duration: 10000,
      easing: Easing.linear,
    }).start(() => StartImageRotate());
  }

  const RotateData = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Fragment>
      {useMemo(
        () => (
          <View style={[styles.container]}>
            <Animated.Image
              source={{uri: item.img}}
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

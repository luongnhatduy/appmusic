import React, {
  useCallback,
  useEffect,
  useState,
  Fragment,
  useMemo,
} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  Dimensions,
  Image,
  StyleSheet,
} from 'react-native';
import {actions as displaymusicAction} from '@modules/displaymusic/store';
import {useSelector, useDispatch} from 'react-redux';

const screenWidth = Dimensions.get('window').width;
import Slider from 'react-native-slider';
import ButtonDisplay from '@components/layout/ButtonDisplay';

const DisplayMusicComponent = ({navigation}) => {
  const dispatch = useDispatch();
  const {valueSlider, seconds} = useSelector(state => state.musicdisplay);

  const Seconds = useMemo(
    () => (
      <View style={styles.viewSeconds}>
        <Text style={styles.txtSeconds}>
          {Math.floor((seconds * valueSlider) / 60)}:
          {((seconds * valueSlider) % 60).toFixed(0) < 10
            ? `0${((seconds * valueSlider) % 60).toFixed(0)}`
            : ((seconds * valueSlider) % 60).toFixed(0)}
        </Text>
        <Text style={styles.txtSeconds}>
          {Math.floor(seconds / 60)}:
          {(seconds % 60).toFixed(0) < 10
            ? `0${(seconds % 60).toFixed(0)}`
            : (seconds % 60).toFixed(0)}
        </Text>
      </View>
    ),
    [seconds, valueSlider],
  );
  return (
    <Fragment>
      <View style={styles.container}>
        {Seconds}

        {useMemo(
          () => (
            <Slider
              style={styles.styleSlider}
              trackStyle={styles.track}
              thumbStyle={styles.thumb}
              minimumTrackTintColor="#990033"
              thumbTouchSize={{width: 40, height: 40}}
              value={valueSlider}
              onValueChange={value => {
                dispatch(displaymusicAction.setSeekSeconds(value));
                dispatch(displaymusicAction.setChangeSeconds(true));
              }}
            />
          ),
          [dispatch, valueSlider],
        )}

        <View style={{paddingBottom: 70, padding: 20}}>
          <ButtonDisplay displayMusicScreen />
        </View>
      </View>
    </Fragment>
  );
};
const styles = StyleSheet.create({
  container: {
    margin: 20,
    maxHeight: '20%',
  },
  styleSlider: {
    height: 30,
    width: '100%',
  },
  track: {
    height: 2,
    backgroundColor: '#C0C0C0',
  },
  thumb: {
    width: 10,
    height: 10,
    backgroundColor: '#990000',
    borderRadius: 10 / 2,
    shadowColor: '#990000',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 2,
    shadowOpacity: 1,
  },
  viewSeconds: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txtSeconds: {
    color: 'white',
  },
});

export default DisplayMusicComponent;

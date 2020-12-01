import React, {useCallback, useEffect, useState} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  Dimensions,
  Image,
  StyleSheet,
  Platform,
} from 'react-native';
const screenWidth = Dimensions.get('window').width;
import ButtonDisplay from '@components/layout/ButtonDisplay';
import {BlurView} from '@react-native-community/blur';
import {useSelector, useDispatch} from 'react-redux';
import NavigationService from '@utils/NavigationService';
import {actions as muicdisplayAction} from '@modules/displaymusic/store';

const DisplayMusicMini = ({navigation}) => {
  const dispatch = useDispatch();
  const {songplaying} = useSelector(state => state.storage);
  const {valueSlider} = useSelector(state => state.musicdisplay);

  const displaymusic = useCallback(() => {
    dispatch(muicdisplayAction.setSeekSeconds(valueSlider));

    NavigationService.navigate('DisplayMusicScreen');
  }, [dispatch]);
  return (
    <View style={styles.container}>
      <BlurView
        style={Platform.OS === 'ios' ? styles.absolute : styles.absoluteAndroid}
        blurType="xlight"
        blurAmount={10}
      />
      <View style={styles.item}>
        <TouchableOpacity
          onPress={displaymusic}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image source={{uri: songplaying.img}} style={styles.imgItem} />
          <View>
            <Text style={[styles.txtItem, {color: 'black'}]}>
              {songplaying.name_song}
            </Text>
            <Text style={styles.txtItem}>{songplaying.name_singer}</Text>
          </View>
        </TouchableOpacity>
        <ButtonDisplay />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 40,
    width: screenWidth,
    zIndex: 10000,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  absoluteAndroid: {
    backgroundColor: 'white',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  img: {
    borderRadius: 5,
  },
  item: {
    flex: 1,
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  txtItem: {
    marginLeft: 10,
    marginRight: 10,
    color: '#8B8989',
    minWidth: 15,
  },
  imgItem: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
});

export default DisplayMusicMini;

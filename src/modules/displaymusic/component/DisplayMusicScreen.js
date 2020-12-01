import React, {useCallback, useEffect} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {withNavigation} from 'react-navigation';
import DisplayMusicHeader from './DisplayMusicHeader';
import ImgDisplayMusic from './ImgDisplayMusic';
import SoundPlayer from 'react-native-sound-player';
import DisplayMusicComponent from './DisplayMusicComponent';
import {useSelector, useDispatch} from 'react-redux';

const DisplayMusicScreen = ({navigation}) => {
  const {songplaying} = useSelector(state => state.storage);
  return (
    <ImageBackground
      source={require('../../../assets/images/displaymusic.jpg')}
      style={styles.imgbg}
      imageStyle={styles.img}>
      <DisplayMusicHeader item={songplaying} />
      <ImgDisplayMusic item={songplaying} />
      <DisplayMusicComponent />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imgbg: {
    flex: 1,
  },
});

export default withNavigation(DisplayMusicScreen);

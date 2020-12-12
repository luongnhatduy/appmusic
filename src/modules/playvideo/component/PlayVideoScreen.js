import React, {useCallback, useEffect, Fragment, useMemo} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {withNavigation} from 'react-navigation';
import {useSelector, useDispatch} from 'react-redux';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';
import NavigationService from '@utils/NavigationService';

const PlayVideoScreen = ({navigation}) => {
  useEffect(() => {
    console.log(navigation.state.params, 'videoF');
  }, [navigation]);

  const onBack = useCallback(() => {
    NavigationService.goBack();
  }, []);

  return (
    <Fragment>
      {useMemo(
        () => (
          <View style={{flex: 1}}>
            {/* <Video
              source={{
                uri: navigation.state.params.link,
              }}
              controls={true}
              style={styles.backgroundVideo}
            /> */}
            <VideoPlayer
              source={{
                uri: navigation.state.params.link,
              }}
              onBack={onBack}
              style={styles.backgroundVideo}
            />
          </View>
        ),
        [navigation.state.params.link, onBack],
      )}
    </Fragment>
  );
};

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    backgroundColor: 'black',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default withNavigation(PlayVideoScreen);

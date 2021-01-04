import React, {useCallback, useEffect, useState} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  FlatList,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {withNavigation} from 'react-navigation';
import DisplayMusicHeader from './DisplayMusicHeader';
import ImgDisplayMusic from './ImgDisplayMusic';
import SoundPlayer from 'react-native-sound-player';
import DisplayMusicComponent from './DisplayMusicComponent';
import {useSelector, useDispatch} from 'react-redux';
import {SwipeablePanel} from 'rn-swipeable-panel';
const dataComment = [
  {
    id: 1,
    username: 'Lương Nhật Duy',
    img:
      'https://scontent.fhan2-5.fna.fbcdn.net/v/t1.0-9/118565996_2665047913762533_6111069045192585394_o.jpg?_nc_cat=109&ccb=2&_nc_sid=09cbfe&_nc_ohc=m7OV_NDXsM4AX_zBN8Z&_nc_ht=scontent.fhan2-5.fna&oh=44c454f6ba465db9ddfa4126f2e65afb&oe=60174121',
    text: 'Ca khúc rất tuyệt với !!',
    date: '10 phút trước ',
  },
  {
    id: 2,
    username: 'Liêm Đào',
    img:
      'https://scontent.fhan2-6.fna.fbcdn.net/v/t1.0-9/120637103_374165610635838_3451201571251309825_o.jpg?_nc_cat=103&ccb=2&_nc_sid=09cbfe&_nc_ohc=WtChiTxQp7kAX-izqvY&_nc_ht=scontent.fhan2-6.fna&oh=27390c74d91f3dd57237ef4e0a345ee0&oe=6018CA1C',
    text: 'Vẫn không hay bằng anh mình hát :)',
    date: '7 phút trước ',
  },
];
const DisplayMusicScreen = ({navigation}) => {
  const {songplaying} = useSelector(state => state.storage);
  const [swipeablePanelActive, setSwipeablePanelActive] = useState(false);

  const closePanel = useCallback(() => {
    setSwipeablePanelActive(false);
  }, [setSwipeablePanelActive]);

  const openPanel = useCallback(() => {
    setSwipeablePanelActive(true);
  }, [setSwipeablePanelActive]);

  return (
    <ImageBackground
      source={require('../../../assets/images/displaymusic.jpg')}
      style={styles.imgbg}
      imageStyle={styles.img}>
      <DisplayMusicHeader item={songplaying} />
      <ImgDisplayMusic item={songplaying} />
      <DisplayMusicComponent />
      <TouchableOpacity
        onPress={openPanel}
        style={{
          backgroundColor: 'white',
          height: 50,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingHorizontal: 20,
          paddingVertical: 5,
        }}>
        <Text style={{fontSize: 20, fontWeight: '500'}}>Bình luận</Text>
      </TouchableOpacity>
      <SwipeablePanel
        fullWidth={true}
        isActive={swipeablePanelActive}
        onClose={closePanel}
        onPressCloseButton={closePanel}>
        <View style={{paddingHorizontal: 10}}>
          <Text style={{fontSize: 20, fontWeight: '500'}}>Bình luận</Text>
          <FlatList
            data={dataComment}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <View style={{flexDirection: 'row', marginTop: 15}}>
                <Image
                  style={{width: 35, height: 35, borderRadius: 40}}
                  source={{
                    uri: item.img,
                  }}
                />
                <View
                  style={{
                    flexDirection: 'column',
                    marginLeft: 10,
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    borderRadius: 10,
                    backgroundColor: '#e0e2e4',
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize: 14, fontWeight: '500'}}>
                      {item.username}
                    </Text>
                    <Text style={{marginLeft: 10, color: 'gray'}}>
                      {item.date}
                    </Text>
                  </View>

                  <Text style={{color: '#24292e', marginTop: 5}}>
                    {item.text}
                  </Text>
                </View>
              </View>
            )}
          />
        </View>
      </SwipeablePanel>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imgbg: {
    flex: 1,
  },
});

export default withNavigation(DisplayMusicScreen);

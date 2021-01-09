import React, {
  Fragment,
  useCallback,
  useEffect,
  useState,
  useRef,
  useMemo,
} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  Keyboard,
  FlatList,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {withNavigation} from 'react-navigation';
import DisplayMusicHeader from './DisplayMusicHeader';
import ImgDisplayMusic from './ImgDisplayMusic';
import SoundPlayer from 'react-native-sound-player';
import DisplayMusicComponent from './DisplayMusicComponent';
import {useSelector, useDispatch} from 'react-redux';
import {SwipeablePanel} from 'rn-swipeable-panel';
import {TextInput} from 'react-native';
import {actions as displaymusicAction} from '@modules/displaymusic/store';
import moment from 'moment';
import 'moment/min/locales';

const screenWidth = Dimensions.get('window').width;
const DisplayMusicScreen = ({navigation}) => {
  const {comments} = useSelector(state => state.musicdisplay);

  console.log(comments, 'comments');
  const [swipeablePanelActive, setSwipeablePanelActive] = useState(false);
  const [txtComment, setTxtComment] = useState('');
  const {dataProfile, songplaying} = useSelector(state => state.storage);
  const dispatch = useDispatch();
  const inputRef = useRef();
  const flatList = React.useRef({animated: false});

  useEffect(() => {
    moment.locale('vi');
  }, [dispatch]);

  const closePanel = useCallback(() => {
    setSwipeablePanelActive(false);
  }, [setSwipeablePanelActive]);

  const openPanel = useCallback(() => {
    setSwipeablePanelActive(true);
    dispatch(displaymusicAction.fetchComment());
  }, [dispatch]);

  const onChangeText = useCallback(value => {
    setTxtComment(value);
  }, []);

  const sendComment = useCallback(() => {
    if (txtComment !== '') {
      dispatch(displaymusicAction.sendComment(txtComment));
      inputRef.current.blur();
      setTxtComment('');
    }
  }, [dispatch, txtComment]);

  const renderItemComment = useCallback(
    ({item, index}) => (
      <View style={{flexDirection: 'row', marginTop: 15}}>
        <Image
          style={{width: 35, height: 35, borderRadius: 40}}
          source={{
            uri: item.user.urlImg,
          }}
        />
        <View
          style={{
            flexDirection: 'column',
            marginLeft: 10,
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderRadius: 10,
            backgroundColor: '#f0efef',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 16, fontWeight: '700'}}>
              {item.user.name}
            </Text>
            <Text style={{marginLeft: 10, color: 'gray'}}>
              {moment(item.createdAt).fromNow()}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 5,
            }}>
            <Text style={{color: '#24292e'}}>{item.text}</Text>
            {!item._id && <Text style={{color: 'gray'}}> (đang chờ...)</Text>}
          </View>
        </View>
      </View>
    ),
    [],
  );

  return (
    <Fragment>
      {useMemo(
        () => (
          <ImageBackground
            source={require('../../../assets/images/displaymusic.jpg')}
            style={styles.imgbg}
            imageStyle={styles.img}>
            <DisplayMusicHeader item={songplaying} />
            <ImgDisplayMusic item={songplaying} />
            <DisplayMusicComponent />
            {dataProfile && (
              <View>
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
                  <Text style={{fontSize: 20, fontWeight: '500'}}>
                    Bình luận
                  </Text>
                </TouchableOpacity>
                <SwipeablePanel
                  fullWidth={true}
                  isActive={swipeablePanelActive}
                  onClose={closePanel}
                  onlyLarge={true}
                  scrollViewProps={true}
                  style={styles.panel}
                  onPressCloseButton={closePanel}>
                  <View
                    style={{
                      paddingHorizontal: 10,
                      marginBottom: 80,
                    }}>
                    <Text style={{fontSize: 20, fontWeight: '500'}}>
                      Bình luận
                    </Text>
                    {comments.length > 0 && (
                      <FlatList
                        inverted
                        data={comments}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderItemComment}
                      />
                    )}
                    {comments.length == 0 && (
                      <ActivityIndicator
                        size="large"
                        color="#990099"
                        style={{marginTop: 10}}
                      />
                    )}
                  </View>
                </SwipeablePanel>

                {swipeablePanelActive && (
                  <View style={styles.comment}>
                    <View style={{flexDirection: 'row', paddingHorizontal: 15}}>
                      <Image
                        style={{width: 35, height: 35, borderRadius: 40}}
                        source={{
                          uri: dataProfile.urlImg,
                        }}
                      />
                      <TextInput
                        placeholder="Viết bình luận..."
                        paddingHorizontal={10}
                        onSubmitEditing={Keyboard.dismiss}
                        ref={inputRef}
                        value={txtComment}
                        onChangeText={onChangeText}
                        style={styles.textinput}
                      />
                      <TouchableOpacity onPress={sendComment}>
                        <Image
                          style={styles.iconSend}
                          resizeMode="contain"
                          source={require('@assets/images/send.png')}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
            )}
          </ImageBackground>
        ),
        [
          closePanel,
          comments,
          dataProfile,
          onChangeText,
          openPanel,
          sendComment,
          songplaying,
          swipeablePanelActive,
          txtComment,
          renderItemComment,
        ],
      )}
    </Fragment>
  );
};

const styles = StyleSheet.create({
  imgbg: {
    flex: 1,
  },
  comment: {
    // height: 40,
    width: screenWidth,
    zIndex: 10000,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    paddingVertical: 10,
    right: 0,
    left: 0,
  },
  textinput: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 40,
    height: 40,
    marginLeft: 10,
    marginRight: 10,
  },
  iconSend: {
    width: 40,
    height: 40,
  },
});

export default withNavigation(DisplayMusicScreen);

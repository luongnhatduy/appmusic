import {createSlice} from 'redux-starter-kit';

const initialState = {
  bannerList: [],
  datalistTop: [],
  songplaying: {},
  likeSong: false,
};

const home = createSlice({
  name: 'home',
  initialState,
  reducers: {
    startGetListBanner: state => ({...state, bannerList: []}),
    successGetListBanner: (state, {payload: {result}}) => ({
      ...state,
      bannerList: result,
    }),
    failGetListBanner: state => ({...state}),

    startGetListTop: state => ({...state, datalistTop: []}),
    successGetListTop: (state, {payload: {result}}) => ({
      ...state,
      datalistTop: result,
    }),
    failGetListTop: state => ({...state}),
    setSongPlaying: (state, {payload}) => ({
      ...state,
      songplaying: payload,
    }),
    setStatusLike: (state, {payload}) => ({
      ...state,
      likeSong: payload,
    }),
  },
});

export default home;

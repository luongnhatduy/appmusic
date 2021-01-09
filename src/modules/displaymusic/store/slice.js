import {createSlice} from 'redux-starter-kit';

const initialState = {
  seekSeconds: undefined,
  navigateDisplay: undefined,
  display: undefined,
  isPause: false,
  valueSlider: 0,
  onChangeSeconds: false,
  seconds: 0,
  isCommentSuccess: false,
  comments: [],
};

const musicdisplay = createSlice({
  name: 'musicdisplay',
  initialState,
  reducers: {
    failGetListFavorite: state => ({...state}),
    startGetListFavorite: state => ({...state, comments: []}),
    successGetListFavorite: (state, {payload: {result}}) => ({
      ...state,
      comments: result,
    }),
    setSeekSeconds: (state, {payload}) => ({
      ...state,
      seekSeconds: payload,
    }),
    setValueSlider: (state, {payload}) => ({
      ...state,
      valueSlider: payload,
    }),
    setChangeSeconds: (state, {payload}) => ({
      ...state,
      onChangeSeconds: payload,
    }),
    setNavigate: (state, {payload}) => ({
      ...state,
      navigateDisplay: payload,
    }),
    setDisplay: (state, {payload}) => ({
      ...state,
      display: payload,
    }),
    commentSuccess: (state, {payload}) => ({
      ...state,
      isCommentSuccess: payload,
    }),
    setDataComments: (state, {payload}) => ({
      ...state,
      comments: payload,
    }),
    setPause: (state, {payload}) => ({
      ...state,
      isPause: payload,
    }),
    setSeconds: (state, {payload}) => ({
      ...state,
      seconds: payload,
    }),
  },
});

export default musicdisplay;

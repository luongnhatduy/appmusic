import {createSlice} from 'redux-starter-kit';

const initialState = {
  seekSeconds: undefined,
  navigateDisplay: undefined,
  display: undefined,
  isPause: false,
  valueSlider: 0,
  onChangeSeconds: false,
  seconds: 0,
};

const musicdisplay = createSlice({
  name: 'musicdisplay',
  initialState,
  reducers: {
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

import {createSlice} from 'redux-starter-kit';

const initialState = {
  songplaying: undefined,
  display: undefined,
  songtabmini: undefined,
  listFavorite: [],
};

const storage = createSlice({
  name: 'storage',
  initialState,
  reducers: {
    setSongPlaying: (state, {payload}) => ({
      ...state,
      songplaying: payload,
    }),
    setDisplay: (state, {payload}) => ({
      ...state,
      display: payload,
    }),
    setSongPlayingTabmini: (state, {payload}) => ({
      ...state,
      songtabmini: payload,
    }),
    successLikeSong: (state, {payload: {result}}) => ({
      ...state,
      listFavorite: result,
    }),
  },
});

export default storage;

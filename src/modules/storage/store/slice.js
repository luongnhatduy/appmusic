import {createSlice} from 'redux-starter-kit';

const initialState = {
  songplaying: undefined,
  display: undefined,
  songtabmini: undefined,
  listFavorite: [],
  dataProfile: undefined,
  isLogged: false,
};

const storage = createSlice({
  name: 'storage',
  initialState,
  reducers: {
    setSongPlaying: (state, {payload}) => ({
      ...state,
      songplaying: payload,
    }),
    setDataProfile: (state, {payload}) => ({
      ...state,
      dataProfile: payload,
    }),
    setDisplay: (state, {payload}) => ({
      ...state,
      display: payload,
    }),
    setIsLogged: (state, {payload}) => ({
      ...state,
      isLogged: payload,
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

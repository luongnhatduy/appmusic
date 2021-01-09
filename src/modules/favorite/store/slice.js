import {createSlice} from 'redux-starter-kit';

const initialState = {
  favoriteList: [],
};

const favorite = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    updateListDataFavorite: (state, {payload}) => ({
      ...state,
      favoriteList: payload,
    }),
    startGetListFavorite: state => ({...state, favoriteList: []}),
    successGetListFavorite: (state, {payload: {result}}) => ({
      ...state,
      favoriteList: result,
    }),
    failGGetListFavorite: state => ({...state}),
  },
});

export default favorite;

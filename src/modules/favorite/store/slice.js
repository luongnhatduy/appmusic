import {createSlice} from 'redux-starter-kit';

const initialState = {
  favoriteList: [],
};

const favorite = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    successGetListFavorite: (state, {payload: {result}}) => ({
      ...state,
      favoriteList: result,
    }),
    updateListDataFavorite: (state, {payload}) => ({
      ...state,
      favoriteList: payload,
    }),
  },
});

export default favorite;

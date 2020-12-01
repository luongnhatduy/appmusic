import {createSlice} from 'redux-starter-kit';

const initialState = {
  listFavorite: [],
};

const favorite = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    startGetListFavorite: state => ({...state, listFavorite: []}),
    successGetListFavorite: (state, {payload: {result}}) => ({
      ...state,
      listFavorite: result,
    }),
    failGetListFavorite: state => ({...state}),
  },
});

export default favorite;

import {createSlice} from 'redux-starter-kit';

const initialState = {
  listMySong: [],
};

const favorite = createSlice({
  name: 'mysong',
  initialState,
  reducers: {
    startGetListMySong: state => ({...state, listMySong: []}),
    successGetListMySong: (state, {payload: {result}}) => ({
      ...state,
      listMySong: result,
    }),
    failGetListMySong: state => ({...state}),
  },
});

export default favorite;

import {createSlice} from 'redux-starter-kit';

const initialState = {
  listSearch: [],
};

const search = createSlice({
  name: 'search',
  initialState,
  reducers: {
    startSearchKey: state => ({...state, listSearch: []}),
    successSearchKey: (state, {payload: {result}}) => ({
      ...state,
      listSearch: result,
    }),
    failSearchKey: state => ({...state}),
    setListSearch: (state, {payload}) => ({
      ...state,
      listSearch: payload,
    }),
  },
});

export default search;

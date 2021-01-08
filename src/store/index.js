import {combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {configureStore} from 'redux-starter-kit';
import AsyncStorage from '@react-native-community/async-storage';
import {persistStore, persistReducer} from 'redux-persist';

import {reducer as homeReducer} from '../modules/home/store';
import {reducer as favoriteReducer} from '../modules/favorite/store';
import {reducer as mysongReducer} from '../modules/mysong/store';
import {reducer as musicdisplayReducer} from '../modules/displaymusic/store';
import {reducer as storageReducer} from '../modules/storage/store';
import {reducer as searchReducer} from '../modules/search/store';
import {reducer as profileReducer} from '../modules/profile/store';

const rootReducer = combineReducers({
  home: homeReducer,
  favorite: favoriteReducer,
  mysong: mysongReducer,
  musicdisplay: musicdisplayReducer,
  storage: storageReducer,
  search: searchReducer,
  profile: profileReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['storage'],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const middleware = [thunk];

const store = configureStore({
  reducer: persistedReducer,
  middleware,
});

export const persistor = persistStore(store);

export default store;

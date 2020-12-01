import createOperation from '@utils/createOperation';
import slice from './slice';
import * as services from './service';

const {
  actions: {successLikeSong},
} = slice;

export const likeSong = createOperation({
  actions: {
    successAction: successLikeSong,
  },
  process: async ({payload, dispatch, getState}) => {
    let listFavorite = getState().storage.listFavorite;
    let newdata = [];
    let vt = -1;
    listFavorite.forEach((i, index) => {
      if (i._id == payload._id) {
        vt = index;
      }
    });
    if (vt > -1) {
      newdata = listFavorite.reduce((array, item, index) => {
        if (index !== vt) array.push(item);
        return array;
      }, []);
    } else {
      newdata = [...listFavorite, payload];
    }
    return newdata;
  },
});

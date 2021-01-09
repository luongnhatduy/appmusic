import createOperation from '@utils/createOperation';
import slice from './slice';
import * as services from './service';

const {
  actions: {startSearchKey, successSearchKey, failSearchKey},
} = slice;

export const searchKey = createOperation({
  actions: {
    startAction: startSearchKey,
    successAction: successSearchKey,
    failAction: failSearchKey,
  },
  process: async ({payload, dispatch, getState}) => {
    console.log(payload, 'key');
    const favoriteList = getState().favorite.favoriteList;
    let result = await services.searchKey(payload);
    if (result && result.length > 0) {
      const idFavorites = favoriteList.map(item => item._id);
      result = result.map(item => {
        if (idFavorites.indexOf(item._id) !== -1) {
          return favoriteList[idFavorites.indexOf(item._id)];
        } else {
          return {
            ...item,
            statusLike: false,
          };
        }
      });
    }
    console.log(result, 'reslut');
    return result;
  },
});

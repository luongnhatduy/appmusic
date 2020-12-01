import createOperation from '@utils/createOperation';
import slice from './slice';
import * as services from './service';

const {
  actions: {successGetListFavorite, startGetListFavorite, failGetListFavorite},
} = slice;

export const fetchListFavorite = createOperation({
  actions: {
    startAction: startGetListFavorite,
    successAction: successGetListFavorite,
    failAction: failGetListFavorite,
  },
  process: async ({payload, dispatch}) => {
    const result = await services.getListFavorite();
    return result;
  },
});

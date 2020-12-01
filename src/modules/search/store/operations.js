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
  process: async ({payload, dispatch}) => {
    const result = await services.searchKey(payload);
    return result;
  },
});

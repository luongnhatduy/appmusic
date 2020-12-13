import createOperation from '@utils/createOperation';
import slice from './slice';
import * as services from './service';

const {
  actions: {
    successGetListBanner,
    startGetListBanner,
    failGetListBanner,
    startGetListTop,
    successGetListTop,
    failGetListTop,
    successLikeSong,
    startLikeSong,
    failLikeSong,
  },
} = slice;

export const fetchListBanner = createOperation({
  actions: {
    startAction: startGetListBanner,
    successAction: successGetListBanner,
    failAction: failGetListBanner,
  },
  process: async ({payload, dispatch}) => {
    const result = await services.getListBanner();
    return result;
  },
});

export const fetchListTop = createOperation({
  actions: {
    startAction: startGetListTop,
    successAction: successGetListTop,
    failAction: failGetListTop,
  },
  process: async ({payload, dispatch}) => {
    const result = await services.getListTop();
    return result;
  },
});

export const likeSong = createOperation({
  actions: {},
  process: async ({payload, dispatch}) => {
    services.likeSong(payload);
  },
});

// import axios from 'axios';
import {api} from '@store/axios';

export const getListBanner = async () => {
  return api.get(`/all_banner`).then(res => res.data);
};

export const getListCategory = async () => {
  return api.get(`/fetchCategory`).then(res => res.data);
};

export const getListTop = async (facebookId, categoryId) => {
  return api.get(`/list_top/${facebookId}/${categoryId}`).then(res =>
    res.data.map(element => {
      console.log(element.statusLike);
      return {
        ...element.item,
        statusLike: element.statusLike,
      };
    }),
  );
};

export const likeSong = async payload => {
  return api.post(`/likeSong`, payload);
};

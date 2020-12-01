// import axios from 'axios';
import {api} from '@store/axios';

export const getListBanner = async () => {
  return api.get(`/all_banner`).then(res => res.data);
};

export const getListTop = async () => {
  return api.get(`/list_top`).then(res => res.data);
};

export const likeSong = async payload => {
  return api.post(`/likeSong`, {_id: payload._id});
};

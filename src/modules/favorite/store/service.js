// import axios from 'axios';
import {api} from '@store/axios';

export const getListFavorite = async () => {
  return api.get(`/list_favorite`).then(res => res.data);
};

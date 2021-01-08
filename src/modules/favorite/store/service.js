// import axios from 'axios';
import {api} from '@store/axios';

export const fetchListFavorite = async accountId => {
  return api.get(`/list_favorite/${accountId}`).then(res => res.data);
};

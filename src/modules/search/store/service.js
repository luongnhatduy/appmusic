// import axios from 'axios';
import {api} from '@store/axios';

export const searchKey = async payload => {
  return api.post(`/search`, {name_song: payload}).then(res => res.data);
};

// import axios from 'axios';
import {api} from '@store/axios';

export const sendComment = async payload => {
  return api.post(`/sendComment`, payload);
};

export const fetchComment = async (accountId, songId) => {
  return api.get(`/fetchComment/${accountId}/${songId}`);
};

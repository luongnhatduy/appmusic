// import axios from 'axios';
import {api} from '@store/axios';

export const sendComment = async payload => {
  return api.post(`/sendComment`, payload);
};

export const deleteComment = async payload => {
  return api.post(`/deleteComment`, payload);
};

export const fetchComment = async songId => {
  return api.get(`/fetchComment/${songId}`);
};

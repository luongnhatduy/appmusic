// import axios from 'axios';
import {api} from '@store/axios';

export const login = async payload => {
  return api.post('/login', payload);
};

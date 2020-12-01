// import pickBy from 'lodash/pickBy';
import axios from 'axios';
import baseUrl from './baseUrl';
// import {_env} from '../config/config';
//dev
const instance = baseURL => {
  const axiosInstance = axios.create({
    baseURL,
    // paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' }),
    timeout: 5000,
    // headers: {
    //   common: headerConfig,
    // },
  });

  //   axiosInstance.interceptors.response.use(response => response, error => globalErrorHandler(error));

  return axiosInstance;
};

export const api = instance(baseUrl.api);

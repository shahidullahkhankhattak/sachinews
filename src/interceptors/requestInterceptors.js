import { LocalStorage } from 'quasar';
import { localStorageKeys } from '../config/constants';

const { JWT_AUTH } = localStorageKeys;

export const bindRequestInterceptors = (axios) => {
  axios.interceptors.request.use(
    (reqConfig) => {
      const { token } = JSON.parse(LocalStorage.getItem(JWT_AUTH) || null) || {};
      if (token) reqConfig.headers.authorization = `Bearer ${token}`;
      return reqConfig;
    },
    (err) => Promise.reject(err),
  );

  return axios;
};

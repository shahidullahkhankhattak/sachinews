import { LocalStorage } from 'quasar';
import { localStorageKeys } from '../config/constants';

const { JWT_AUTH } = localStorageKeys;

export default function (axios) {
  axios.interceptors.request.use(
    (reqConfig) => {
      const { token } = LocalStorage.getItem(JWT_AUTH) || {};
      if (token) reqConfig.headers.authorization = token;
      return reqConfig;
    },
    (err) => Promise.reject(err),
  );

  return axios;
}

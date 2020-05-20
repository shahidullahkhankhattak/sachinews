import { LocalStorage } from 'quasar';
import { localStorageKeys } from '../config/constants';
import { setLoading } from '../config/configSetters';

const { JWT_AUTH } = localStorageKeys;

export default function (axios) {
  axios.interceptors.request.use(
    (reqConfig) => {
      if (!process.env.SERVER && !reqConfig.headers.noLoader) {
        setLoading(true);
      }
      const reqUrl = new URL(reqConfig.url);
      reqUrl.searchParams.append('_', Date.now());
      reqConfig.url = reqUrl.toString();
      const { token } = LocalStorage.getItem(JWT_AUTH) || {};
      if (token) reqConfig.headers.authorization = token;
      return reqConfig;
    },
    (err) => Promise.reject(err),
  );

  return axios;
}

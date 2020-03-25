import { LocalStorage } from 'quasar';
import { responseTypes, localStorageKeys } from '../config/constants';
import router from '../router';

const { SESSION_EXPIRED, statusCodes: { UNAUTHORIZED } } = responseTypes;
export default function (axios) {
  axios.interceptors.response.use(
    (response) => Promise.resolve(response),
    (err) => {
      const { data: { statusCode, errors } } = err.response;
      if (statusCode === UNAUTHORIZED && errors.find((item) => item.param === SESSION_EXPIRED)) {
        LocalStorage.remove(localStorageKeys.JWT_AUTH);
        router().push('/login');
      }
      Promise.reject(err);
    },
  );

  return axios;
}

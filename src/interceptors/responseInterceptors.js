import { LocalStorage } from 'quasar';
import { responseTypes, localStorageKeys } from '../config/constants';
import router from '../router';
import { Notify } from '../plugins/notify';
import { setLoading } from '../config/configSetters';

const { SESSION_EXPIRED, statusCodes: { UNAUTHORIZED } } = responseTypes;
export default function (axios) {
  axios.interceptors.response.use(
    (response) => {
      if (!process.env.SERVER) {
        setTimeout(() => {
          setLoading(false);
        }, 200);
      }
      const { data: { successMessage } = {} } = response;
      if (successMessage) {
        setTimeout(() => {
          Notify({
            type: 'positive',
            message: successMessage,
          });
        }, 500);
      }
      return response.data;
    },
    (err) => {
      if (!process.env.SERVER) {
        setTimeout(() => {
          setLoading(false);
        }, 200);
      }
      const { data: { statusCode, errors } = {} } = err.response;
      if (errors && errors.length) {
        errors.forEach((error) => {
          setTimeout(() => {
            Notify({
              type: 'negative',
              message: error.msg,
            });
          }, 500);
        });
      }
      if (statusCode === UNAUTHORIZED && errors.find((item) => item.param === SESSION_EXPIRED)) {
        LocalStorage.remove(localStorageKeys.JWT_AUTH);
        router().push('/login');
      }
      if (err.response) { return Promise.reject(err.response); }
      Promise.reject(err);
    },
  );

  return axios;
}

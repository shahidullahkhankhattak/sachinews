import { LocalStorage } from 'quasar';
import { responseTypes, localStorageKeys } from '../config/constants';
import { Notify } from '../plugins/notify';
import { setLoading } from '../config/configSetters';
import { watcherBus } from '../utils/dataBus';

const { SESSION_EXPIRED, statusCodes: { UNAUTHORIZED, INCOMPLETE } } = responseTypes;
export default function (axios) {
  axios.interceptors.response.use(
    (response) => {
      watcherBus.loading = false;
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
      return Promise.resolve(response.data);
    },
    (err) => {
      watcherBus.loading = false;
      if (!process.env.SERVER) {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
      const { data: { statusCode, errors } = {} } = err.response;
      if (errors && errors.length && statusCode !== INCOMPLETE) {
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
        window.location.href = '/login';
      }
      if (err.response) { return Promise.reject(err.response); }
      Promise.reject(err);
    },
  );

  return axios;
}

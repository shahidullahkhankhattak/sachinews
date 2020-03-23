import { LocalStorage } from 'quasar';
import axios from '../../api/axios';
import { se2errors } from '../formatters';
import { apiEndpoints } from '../../api/constants';
import { localStorageKeys } from '../../config/constants';
import { setLoading } from '../../config/configSetters';
import { Mutations } from './constants';

const {
  LOGIN_ENDPOINT,
} = apiEndpoints;
const {
  JWT_AUTH,
} = localStorageKeys;
const {
  SET_AUTH,
} = Mutations;

export async function authenticate(context, payload) {
  setLoading(true);
  try {
    const { data: { errors, jwtAuth } } = await axios.post(LOGIN_ENDPOINT, payload);
    setLoading(false);
    const state = {
      errors,
      jwtAuth,
    };
    if (!errors) LocalStorage.set(JWT_AUTH, jwtAuth);
    context.commit(SET_AUTH, state);
  } catch (ex) {
    setLoading(false);
    const state = {
      errors: se2errors(ex),
    };
    context.commit(SET_AUTH, state);
  }
}

import { LocalStorage } from 'quasar';
import axios from '../../api/axios';
import { se2errors } from '../formatters';
import { apiEndpoints } from '../../api/constants';
import { localStorageKeys, roles } from '../../config/constants';
import { Mutations } from './constants';

const { ADMIN } = roles;
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
  try {
    const { errors, jwtAuth } = await axios.post(LOGIN_ENDPOINT, payload);
    const state = {
      errors,
      jwtAuth,
    };
    const { user } = jwtAuth || {};
    if (!errors) LocalStorage.set(JWT_AUTH, jwtAuth);
    context.commit(SET_AUTH, state);
    if (user && user.role === ADMIN) {
      this.$router.push('/admin');
    } else {
      this.$router.push('/');
    }
  } catch (ex) {
    se2errors(ex);
  }
}

export function setJwtAuth(context) {
  const state = {
    jwtAuth: LocalStorage.getItem(JWT_AUTH),
  };
  context.commit(SET_AUTH, state);
}

export function deAuthenticate(context) {
  LocalStorage.remove(JWT_AUTH);
  const state = {
    jwtAuth: undefined,
  };
  context.commit(SET_AUTH, state);
  this.$router.push('/login');
}

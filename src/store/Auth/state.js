import { LocalStorage } from 'quasar';
import { localStorageKeys } from '../../config/constants';

const {
  JWT_AUTH,
} = localStorageKeys;

export default function () {
  return {
    auth: {
      jwtAuth: LocalStorage.getItem(JWT_AUTH),
      errors: null,
    },
  };
}

import { LocalStorage } from 'quasar';
import { roles, localStorageKeys } from '../config/constants';

const { ADMIN } = roles;
const { JWT_AUTH } = localStorageKeys;

export default (to, _from, next) => {
  if (to.matched.some((record) => record.meta.auth)) {
    if (LocalStorage.getItem(JWT_AUTH) == null) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath },
      });
    } else {
      const jwtAuth = LocalStorage.getItem(JWT_AUTH) || {};
      const { user } = jwtAuth;
      if (to.matched.some((record) => record.meta.admin)) {
        if (user.role === ADMIN) {
          next();
        } else {
          next({ name: 'userboard' });
        }
      } else {
        next();
      }
    }
  } else if (to.matched.some((record) => record.meta.guest)) {
    if (!LocalStorage.getItem(JWT_AUTH)) {
      next();
    } else {
      next({ name: 'userboard' });
    }
  } else {
    next();
  }
};

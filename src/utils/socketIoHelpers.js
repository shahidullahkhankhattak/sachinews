import { LocalStorage } from 'quasar';

export function ProtectedData(obj) {
  const { token } = LocalStorage.getItem('jwtAuth') || {};
  return token && { ...obj, token };
}

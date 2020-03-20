
import { mutations } from './constants';

const {
  SET_LOCALE,
} = mutations;

export function setLocale(context, payload) {
  context.commit(SET_LOCALE, payload);
}

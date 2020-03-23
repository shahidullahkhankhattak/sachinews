
import { Mutations } from './constants';

const {
  SET_LOCALE,
} = Mutations;

export function setLocale(context, payload) {
  context.commit(SET_LOCALE, payload);
}

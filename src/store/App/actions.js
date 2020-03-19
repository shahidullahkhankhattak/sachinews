
import { Screen } from 'quasar';
import { mutations } from './constants';
import { wait } from '../../helpers/asyncHelpers';

const {
  SET_LOCALE,
  SET_SIDEBAR_OPEN,
  TOGGLE_SIDEBAR,
} = mutations;

export function toggleSidebar(context) {
  context.commit(TOGGLE_SIDEBAR);
}

export function setSidebarOpen(context, payload) {
  context.commit(SET_SIDEBAR_OPEN, payload);
}

export async function setLocale(context, payload) {
  if (Screen.gt.sm) {
    context.commit(TOGGLE_SIDEBAR);
    await wait(200);
    context.commit(SET_LOCALE, payload);
    context.commit(TOGGLE_SIDEBAR);
  } else {
    context.commit(SET_LOCALE, payload);
  }
}

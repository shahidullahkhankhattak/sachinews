import { mapActions, mapGetters } from 'vuex';
import {
  APP_SET_LOCALE, APP_TOGGLE_SIDEBAR, APP_LOCALE, APP_SITE_DIR,
} from '../../store/App/constants';

export const getters = {
  ...mapGetters({ locale: APP_LOCALE, siteDir: APP_SITE_DIR }),
};
export const setters = {
  ...mapActions({
    setLocale: APP_SET_LOCALE,
    toggleSidebar: APP_TOGGLE_SIDEBAR,
  }),
};

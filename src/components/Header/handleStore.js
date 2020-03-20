import { mapGetters } from 'vuex';
import {
  APP_LOCALE, APP_SITE_DIR,
} from '../../store/App/constants';

export const getters = {
  ...mapGetters({ locale: APP_LOCALE, siteDir: APP_SITE_DIR }),
};

import { mapGetters } from 'vuex';
import {
  Getters,
} from '../../store/App/constants';

const {
  APP_LOCALE, APP_SITE_DIR,
} = Getters;

export const getters = {
  ...mapGetters({ locale: APP_LOCALE, siteDir: APP_SITE_DIR }),
};

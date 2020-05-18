import { mapGetters } from 'vuex';
import {
  Getters,
} from '../../store/App/constants';
import {
  Getters as LanguageGetters,
} from '../../store/Languages/constants';

const {
  APP_LOCALE, APP_SITE_DIR,
} = Getters;
const {
  LIST: LANGUAGE_LIST,
} = LanguageGetters;

export const getters = {
  ...mapGetters({ locale: APP_LOCALE, siteDir: APP_SITE_DIR, languages: LANGUAGE_LIST }),
};

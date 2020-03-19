import { mapMutations, mapGetters } from 'vuex';
import { APP_SET_LOCALE, APP_LOCALE } from '../../store/App/constants';

export const getters = {
  ...mapGetters({ locale: APP_LOCALE }),
};
export const setters = {
  ...mapMutations({
    setLocale: APP_SET_LOCALE,
  }),
};

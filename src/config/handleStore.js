
import { mapActions } from 'vuex';
import { APP_SET_LOCALE } from '../store/App/constants';

export const setters = {
  ...mapActions({
    setLocale: APP_SET_LOCALE,
  }),
};

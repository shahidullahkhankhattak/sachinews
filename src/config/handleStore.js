
import { mapActions } from 'vuex';
import { Actions } from '../store/App/constants';

const { APP_SET_LOCALE } = Actions;
export const setters = {
  ...mapActions({
    setLocale: APP_SET_LOCALE,
  }),
};

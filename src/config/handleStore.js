
import { mapActions } from 'vuex';
import { Actions } from '../store/App/constants';

const { SET_LOCALE } = Actions;
export const setters = {
  ...mapActions({
    setLocale: SET_LOCALE,
  }),
};

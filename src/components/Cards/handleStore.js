import { mapGetters } from 'vuex';
import { Getters } from '../../store/App/constants';

const { APP_LOCALE } = Getters;

export const getters = {
  ...mapGetters({
    locale: APP_LOCALE,
  }),
};

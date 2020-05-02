import { mapGetters } from 'vuex';
import { Getters } from '../../store/App/constants';

const {
  APP_SITE_DIR,
} = Getters;

export const getters = {
  ...mapGetters({
    siteDir: APP_SITE_DIR,
  }),
};

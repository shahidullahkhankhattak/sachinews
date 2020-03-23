import { mapGetters } from 'vuex';
import { Getters } from '../../store/App/constants';

const { APP_SIDEBAR_POS } = Getters;

export const getters = {
  ...mapGetters({ sidebarPos: APP_SIDEBAR_POS }),
};

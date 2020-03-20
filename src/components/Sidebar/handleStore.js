import { mapGetters } from 'vuex';
import { APP_SIDEBAR_POS } from '../../store/App/constants';

export const getters = {
  ...mapGetters({ sidebarPos: APP_SIDEBAR_POS }),
};

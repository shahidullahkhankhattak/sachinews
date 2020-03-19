import { mapActions, mapGetters } from 'vuex';
import { APP_SET_SIDEBAR_OPEN, APP_IS_SIDEBAR_OPEN, APP_SIDEBAR_POS } from '../../store/App/constants';

export const getters = {
  ...mapGetters({ isSidebarOpen: APP_IS_SIDEBAR_OPEN, sidebarPos: APP_SIDEBAR_POS }),
};
export const setters = {
  ...mapActions({
    setSidebarOpen: APP_SET_SIDEBAR_OPEN,
  }),
};

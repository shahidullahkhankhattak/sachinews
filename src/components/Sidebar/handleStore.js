import { mapMutations, mapGetters } from 'vuex';
import { APP_SET_SIDEBAR_OPEN, APP_IS_SIDEBAR_OPEN } from '../../store/App/constants';

export const getters = {
  ...mapGetters({ isSidebarOpen: APP_IS_SIDEBAR_OPEN }),
};
export const setters = {
  ...mapMutations({
    setSidebarOpen: APP_SET_SIDEBAR_OPEN,
  }),
};

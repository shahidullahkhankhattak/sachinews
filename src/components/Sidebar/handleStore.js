import { mapGetters } from 'vuex';
import { Getters } from '../../store/App/constants';
import { Getters as sourceGetters } from '../../store/Sources/constants';
import { Getters as categoryGetters } from '../../store/Categories/constants';

// getters
const { APP_SIDEBAR_POS } = Getters;
const { LIST: SOURCE_LIST } = sourceGetters;
const { LIST: CATEGORY_LIST } = categoryGetters;

export const getters = {
  ...mapGetters({
    sidebarPos: APP_SIDEBAR_POS,
    sources: SOURCE_LIST,
    categories: CATEGORY_LIST,
  }),
};

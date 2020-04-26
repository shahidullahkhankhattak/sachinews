
import { mapGetters } from 'vuex';
import { Actions as sourceActions, Getters as sourceGetters } from '../../store/Sources/constants';
import { Actions as categoryActions, Getters as categoryGetters } from '../../store/Categories/constants';


// actions
const { FETCH_USER_SOURCES } = sourceActions;
const { FETCH_USER_CATEGORIES } = categoryActions;

// getters
const { LIST: SOURCE_LIST } = sourceGetters;
const { LIST: CATEGORY_LIST } = categoryGetters;

export const getters = {
  ...mapGetters({
    sources: SOURCE_LIST,
    categories: CATEGORY_LIST,
  }),
};


export const preFetchMethods = {
  fetchCategories: ({ store }) => store.dispatch(FETCH_USER_CATEGORIES),
  fetchSources: ({ store }) => store.dispatch(FETCH_USER_SOURCES),
};

import { mapGetters, mapActions } from 'vuex';
import { Getters, Actions } from '../../store/Stories/constants';
import { Getters as CategoryGetters } from '../../store/Categories/constants';

// getters
const {
  STORIES,
  LOADING,
  PER_PAGE,
  TOTAL,
} = Getters;
const {
  LIST: CATEGORY_LIST,
} = CategoryGetters;

// actions
const {
  FETCH_STORIES,
} = Actions;

export const getters = {
  ...mapGetters({
    stories: STORIES,
    categories: CATEGORY_LIST,
    loading: LOADING,
    perPage: PER_PAGE,
    total: TOTAL,
  }),
};

export const actions = {
  ...mapActions({
    fetchStories: FETCH_STORIES,
  }),
};

export function handlePrefetch({ store, currentRoute, redirect }) {
  const { slug } = currentRoute.params;
  const query = {
    category: slug,
  };
  const categories = getters.categories.bind({ $store: store })();
  const category = categories.find((cat) => cat.slug === slug);
  if (!category) redirect('/404');
  return store.dispatch(FETCH_STORIES, { refresh: true, query });
}

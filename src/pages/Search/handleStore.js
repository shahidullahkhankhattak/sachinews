import { mapGetters, mapActions } from 'vuex';
import { Getters, Actions } from '../../store/Stories/constants';
import { Getters as AppGetters } from '../../store/App/constants';

const {
  STORIES,
  LOADING,
  PER_PAGE,
  TOTAL,
} = Getters;
const {
  APP_LOCALE,
} = AppGetters;
const {
  FETCH_STORIES,
} = Actions;

export const getters = {
  ...mapGetters({
    stories: STORIES,
    loading: LOADING,
    perPage: PER_PAGE,
    total: TOTAL,
    locale: APP_LOCALE,
  }),
};

export const actions = {
  ...mapActions({
    fetchStories: FETCH_STORIES,
  }),
};

export function handlePrefetch({ store, currentRoute }, isMount) {
  if (process.browser && !isMount) return;
  const { q } = currentRoute.params;
  const query = {
    search: q,
  };
  return store.dispatch(FETCH_STORIES, { refresh: true, query });
}

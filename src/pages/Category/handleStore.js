import { mapGetters, mapActions } from 'vuex';
import { Getters, Actions } from '../../store/Stories/constants';

const {
  STORIES,
  LOADING,
  PER_PAGE,
  TOTAL,
} = Getters;
const {
  FETCH_STORIES,
} = Actions;

export const getters = {
  ...mapGetters({
    stories: STORIES,
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

export function handlePrefetch({ store, currentRoute }) {
  const { slug } = currentRoute.params;
  const query = {
    category: slug,
  };
  return store.dispatch(FETCH_STORIES, { refresh: true, query });
}

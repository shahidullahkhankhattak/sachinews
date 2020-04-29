import { mapGetters, mapActions } from 'vuex';
import { Getters, Actions } from '../../store/Stories/constants';

const {
  GET_TOP_STORIES,
  LOADING,
  PER_PAGE,
} = Getters;
const {
  FETCH_TOP_STORIES,
} = Actions;

export const getters = {
  ...mapGetters({
    topStories: GET_TOP_STORIES,
    loading: LOADING,
    perPage: PER_PAGE,
  }),
};

export const actions = {
  ...mapActions({
    fetchTopStories: FETCH_TOP_STORIES,
  }),
};

export function handlePrefetch({ store, currentRoute }) {
  const { query } = currentRoute;
  return store.dispatch(FETCH_TOP_STORIES, { refresh: true, query });
}

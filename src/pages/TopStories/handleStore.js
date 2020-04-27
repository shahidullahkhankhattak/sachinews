import { mapGetters, mapActions } from 'vuex';
import { Getters, Actions } from '../../store/Stories/constants';

const {
  GET_TOP_STORIES,
  LOADING,
} = Getters;
const {
  FETCH_TOP_STORIES,
} = Actions;

export const getters = {
  ...mapGetters({
    topStories: GET_TOP_STORIES,
    loading: LOADING,
  }),
};

export const actions = {
  ...mapActions({
    fetchTopStories: FETCH_TOP_STORIES,
  }),
};

export function handlePrefetch({ store }) {
  if (!store.getters[GET_TOP_STORIES].length) {
    return store.dispatch(FETCH_TOP_STORIES);
  }
}

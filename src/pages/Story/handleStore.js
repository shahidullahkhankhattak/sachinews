import { mapGetters } from 'vuex';
import { Actions, Getters } from '../../store/Stories/constants';

const {
  FETCH_STORY,
} = Actions;
const {
  STORY,
  LOADING,
} = Getters;

export const getters = {
  ...mapGetters({
    story: STORY,
    loading: LOADING,
  }),
};

export function handlePrefetch({ store, currentRoute }) {
  const { slug } = currentRoute.params;
  return store.dispatch(FETCH_STORY, slug);
}

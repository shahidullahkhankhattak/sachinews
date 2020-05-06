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

export async function handlePrefetch({ store, currentRoute, redirect }) {
  const { id, locale } = currentRoute.params;
  await store.dispatch(FETCH_STORY, id);
  const story = getters.story.bind({ $store: store })();
  if (!story) { redirect(`/${locale}/404`); }
}

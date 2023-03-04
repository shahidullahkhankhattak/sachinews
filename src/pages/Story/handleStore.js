import { mapGetters } from 'vuex';
import { Getters as AppGetters } from '../../store/App/constants';
import { Actions, Getters } from '../../store/Stories/constants';

const {
  FETCH_STORY,
} = Actions;

// getters
const {
  APP_LOCALE,
} = AppGetters;
const {
  STORY,
  LOADING,
} = Getters;

export const getters = {
  ...mapGetters({
    locale: APP_LOCALE,
    story: STORY,
    loading: LOADING,
  }),
};

export async function handlePrefetch({ store, currentRoute, redirect }, isMount) {
  if (process.browser && !isMount) return;
  const { id, locale } = currentRoute.params;
  await store.dispatch(FETCH_STORY, id);
  const story = getters.story.bind({ $store: store })();
  if (!story) { redirect(`/${locale}/404`); }
}

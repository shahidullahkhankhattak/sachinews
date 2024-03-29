import { mapGetters, mapActions } from 'vuex';
import { Getters, Actions } from '../../store/Stories/constants';
import { Getters as AppGetters } from '../../store/App/constants';
import { Getters as SourceGetters } from '../../store/Sources/constants';

// getters
const {
  STORIES,
  LOADING,
  PER_PAGE,
  TOTAL,
} = Getters;
const {
  LIST: SOURCE_LIST,
} = SourceGetters;
const {
  APP_LOCALE,
} = AppGetters;

// actions
const {
  FETCH_STORIES,
} = Actions;

export const getters = {
  ...mapGetters({
    stories: STORIES,
    sources: SOURCE_LIST,
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

export function handlePrefetch({ store, currentRoute, redirect }, isMount) {
  if (process.browser && !isMount) return;
  const { slug, locale } = currentRoute.params;
  const sources = getters.sources.bind({ $store: store })();
  const source = sources.find((sourc) => sourc.slug === slug);
  if (!source) redirect(`/${locale}/404`);
  const query = {
    source: source && source._id,
  };
  return store.dispatch(FETCH_STORIES, { refresh: true, query });
}

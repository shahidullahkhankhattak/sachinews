import { mapGetters, mapActions } from 'vuex';
import { Getters, Actions } from '../../store/Stories/constants';
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
  }),
};

export const actions = {
  ...mapActions({
    fetchStories: FETCH_STORIES,
  }),
};

export function handlePrefetch({ store, currentRoute, redirect }) {
  const { slug, locale } = currentRoute.params;
  const query = {
    source: slug,
  };
  const sources = getters.sources.bind({ $store: store })();
  const source = sources.find((cat) => cat.slug === slug);
  if (!source) redirect(`/${locale}/404`);
  return store.dispatch(FETCH_STORIES, { refresh: true, query });
}

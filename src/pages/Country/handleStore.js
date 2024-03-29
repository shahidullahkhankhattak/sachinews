import { mapGetters, mapActions } from 'vuex';
import { Getters as AppGetters } from '../../store/App/constants';
import { Getters, Actions } from '../../store/Stories/constants';
import { Getters as CountryGetters } from '../../store/Countries/constants';

// getters
const {
  STORIES,
  LOADING,
  PER_PAGE,
  TOTAL,
} = Getters;
const {
  LIST: COUNTRY_LIST,
} = CountryGetters;
const {
  COUNTRY,
  APP_LOCALE,
} = AppGetters;

// actions
const {
  FETCH_STORIES,
} = Actions;

export const getters = {
  ...mapGetters({
    stories: STORIES,
    countries: COUNTRY_LIST,
    country: COUNTRY,
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
  const countries = getters.countries.bind({ $store: store })();
  const country = countries.find((_country) => _country.iso === slug);
  if (!country) redirect(`/${locale}/404`);
  const query = {
    country: country && country._id,
  };
  return store.dispatch(FETCH_STORIES, { refresh: true, query });
}

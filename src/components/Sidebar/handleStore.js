import { mapGetters } from 'vuex';
import { Getters } from '../../store/App/constants';
import { Getters as sourceGetters } from '../../store/Sources/constants';
import { Getters as categoryGetters } from '../../store/Categories/constants';
import { Getters as countryGetters } from '../../store/Countries/constants';

// getters
const { APP_SIDEBAR_POS, APP_LOCALE, COUNTRY } = Getters;
const { LIST: SOURCE_LIST } = sourceGetters;
const { LIST: CATEGORY_LIST } = categoryGetters;
const { LIST: COUNTRY_LIST } = countryGetters;

export const getters = {
  ...mapGetters({
    sidebarPos: APP_SIDEBAR_POS,
    sources: SOURCE_LIST,
    categories: CATEGORY_LIST,
    countries: COUNTRY_LIST,
    country: COUNTRY,
    locale: APP_LOCALE,
  }),
};

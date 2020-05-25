
import { mapGetters } from 'vuex';
import { Actions as SourceActions, Getters as SourceGetters } from '../../store/Sources/constants';
import { Actions as CategoryActions, Getters as CategoryGetters } from '../../store/Categories/constants';
import { Actions as CountryActions, Getters as CountryGetters } from '../../store/Countries/constants';
import { Actions as LanguagActions, Getters as LanguageGetters } from '../../store/Languages/constants';
import { Actions as AppActions, Getters as AppGetters } from '../../store/App/constants';
import { Actions as TranslationActions } from '../../store/Translations/constants';


// actions
const { FETCH_USER_SOURCES } = SourceActions;
const { FETCH_USER_CATEGORIES } = CategoryActions;
const { FETCH_USER_LANGUAGES } = LanguagActions;
const { SET_LOCALE, SET_COUNTRY } = AppActions;
const { FETCH_USER_TRANSLATIONS } = TranslationActions;
const { FETCH_USER_COUNTRIES } = CountryActions;

// getters
const { LIST: SOURCE_LIST } = SourceGetters;
const { LIST: CATEGORY_LIST } = CategoryGetters;
const { LIST: LANG_LIST } = LanguageGetters;
const { APP_LOCALE } = AppGetters;
const { LIST: COUNTRY_LIST } = CountryGetters;

export const getters = {
  ...mapGetters({
    sources: SOURCE_LIST,
    categories: CATEGORY_LIST,
    countries: COUNTRY_LIST,
    languages: LANG_LIST,
    locale: APP_LOCALE,
  }),
};


export const preFetchMethods = {
  fetchCategories: ({ store }) => store.dispatch(FETCH_USER_CATEGORIES),
  fetchCountries: ({ store }) => store.dispatch(FETCH_USER_COUNTRIES),
  setCountry: ({ store }, country) => store.dispatch(SET_COUNTRY, country),
  fetchSources: ({ store }, language) => store.dispatch(FETCH_USER_SOURCES, language),
  fetchLanguages: ({ store }) => store.dispatch(FETCH_USER_LANGUAGES),
  fetchTranslations: ({ store }, lang) => store.dispatch(FETCH_USER_TRANSLATIONS, lang),
  setLocale: ({ store }, lang) => store.dispatch(SET_LOCALE, lang),
};

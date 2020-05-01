
import { mapGetters } from 'vuex';
import { Actions as SourceActions, Getters as SourceGetters } from '../../store/Sources/constants';
import { Actions as CategoryActions, Getters as CategoryGetters } from '../../store/Categories/constants';
import { Actions as LanguagActions, Getters as LanguageGetters } from '../../store/Languages/constants';
import { Actions as AppActions } from '../../store/App/constants';
import { Actions as TranslationAction } from '../../store/Translations/constants';


// actions
const { FETCH_USER_SOURCES } = SourceActions;
const { FETCH_USER_CATEGORIES } = CategoryActions;
const { FETCH_USER_LANGUAGES } = LanguagActions;
const { APP_SET_LOCALE } = AppActions;

// getters
const { LIST: SOURCE_LIST } = SourceGetters;
const { LIST: CATEGORY_LIST } = CategoryGetters;
const { LIST: LANG_LIST } = LanguageGetters;


export const getters = {
  ...mapGetters({
    sources: SOURCE_LIST,
    categories: CATEGORY_LIST,
    languages: LANG_LIST,
  }),
};


export const preFetchMethods = {
  fetchCategories: ({ store }) => store.dispatch(FETCH_USER_CATEGORIES),
  fetchSources: ({ store }, language) => store.dispatch(FETCH_USER_SOURCES, language),
  fetchLanguages: ({ store }) => store.dispatch(FETCH_USER_LANGUAGES),
  fetchTranslations: ({ store }, lang) => store.dispatch(TranslationAction, lang),
  setLocale: ({ store }, lang) => store.dispatch(APP_SET_LOCALE, lang),
};

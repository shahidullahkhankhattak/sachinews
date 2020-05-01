import { mapActions, mapGetters } from 'vuex';
import { Actions, Getters } from '../../../store/Sources/constants';
import { Actions as LanguageActions, Getters as LanguageGetters } from '../../../store/Languages/constants';

// actions
const {
  ADD,
  FETCH,
  DELETE,
  UPDATE,
} = Actions;
const {
  FETCH: FETCH_LANGUAGES,
} = LanguageActions;

// getters
const {
  LIST,
} = Getters;
const {
  LIST: LANGUAGE_LIST,
} = LanguageGetters;

export const getters = {
  ...mapGetters({
    list: LIST,
    languages: LANGUAGE_LIST,
  }),
};

export const actions = {
  ...mapActions({
    update: UPDATE,
    delete: DELETE,
    fetch: FETCH,
    fetchLanguages: FETCH_LANGUAGES,
    add: ADD,
  }),
};

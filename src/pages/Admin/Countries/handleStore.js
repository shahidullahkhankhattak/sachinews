import { mapActions, mapGetters } from 'vuex';
import { Actions, Getters } from '../../../store/Countries/constants';
import { Actions as LanguageActions, Getters as LanguageGetters } from '../../../store/Languages/constants';
import { Actions as RegionActions, Getters as RegionGetters } from '../../../store/Regions/constants';

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
const {
  FETCH: FETCH_REGIONS,
} = RegionActions;

// getters
const {
  LIST,
} = Getters;
const {
  LIST: LANGUAGE_LIST,
} = LanguageGetters;
const {
  LIST: REGION_LIST,
} = RegionGetters;

export const getters = {
  ...mapGetters({
    list: LIST,
    languages: LANGUAGE_LIST,
    regions: REGION_LIST,
  }),
};

export const actions = {
  ...mapActions({
    update: UPDATE,
    delete: DELETE,
    fetch: FETCH,
    fetchLanguages: FETCH_LANGUAGES,
    fetchRegions: FETCH_REGIONS,
    add: ADD,
  }),
};

import { mapActions, mapGetters } from 'vuex';
import { Actions, Getters } from '../../../store/Sources/constants';

const {
  ADD_SOURCE,
  FETCH_ALL_SOURCES,
  DELETE_SOURCE,
  UPDATE_SOURCE,
} = Actions;

const {
  ALL_SOURCES,
  ERRORS,
} = Getters;

export const getters = {
  ...mapGetters({
    errors: ERRORS,
    sources: ALL_SOURCES,
  }),
};

export const actions = {
  ...mapActions({
    updateSource: UPDATE_SOURCE,
    deleteSource: DELETE_SOURCE,
    fetchAllSources: FETCH_ALL_SOURCES,
    addSource: ADD_SOURCE,
  }),
};

import { mapActions, mapGetters } from 'vuex';
import { Actions, Getters } from '../../../store/Sources/constants';

const {
  SOURCES_ADD_SOURCE,
} = Actions;
const {
  ALL_SOURCES,
} = Getters;

export const getters = {
  ...mapGetters({
    sources: ALL_SOURCES,
  }),
};

export const actions = {
  ...mapActions({
    addSource: SOURCES_ADD_SOURCE,
  }),
};

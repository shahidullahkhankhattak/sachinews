import { mapActions, mapGetters } from 'vuex';
import { Getters, Actions } from '../../store/App/constants';

const {
  COUNTS,
} = Getters;
const {
  FETCH_COUNTS,
} = Actions;

export const actions = {
  ...mapActions({
    fetchCounts: FETCH_COUNTS,
  }),
};

export const getters = {
  ...mapGetters({
    counts: COUNTS,
  }),
};

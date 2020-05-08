import { mapActions, mapGetters } from 'vuex';
import { Getters, Actions } from '../../store/App/constants';

const {
  COUNTS,
} = Getters;
const {
  APP_FETCH_COUNTS,
} = Actions;

export const actions = {
  ...mapActions({
    fetchCounts: APP_FETCH_COUNTS,
  }),
};

export const getters = {
  ...mapGetters({
    counts: COUNTS,
  }),
};

import { mapActions, mapGetters } from 'vuex';
import { Actions, Getters } from '../../../store/Sources/constants';

const {
  FETCH,
} = Actions;
const {
  LIST,
} = Getters;

export const getters = {
  ...mapGetters({
    list: LIST,
  }),
};

export const actions = {
  ...mapActions({
    fetch: FETCH,
  }),
};

import { mapActions, mapGetters } from 'vuex';
import { Actions, Getters } from '../../../store/Regions/constants';

const {
  ADD,
  FETCH,
  DELETE,
  UPDATE,
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
    update: UPDATE,
    delete: DELETE,
    fetch: FETCH,
    add: ADD,
  }),
};

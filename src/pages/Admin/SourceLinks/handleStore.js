import { mapActions, mapGetters } from 'vuex';
import { Getters as CatGetters } from '../../../store/Categories/constants';
import { Actions, Getters } from '../../../store/SourceLinks/constants';

const {
  ADD,
  FETCH,
  DELETE,
  UPDATE,
} = Actions;

const {
  LIST,
} = Getters;
const {
  LIST: CAT_LIST,
} = CatGetters;

export const getters = {
  ...mapGetters({
    list: LIST,
    categories: CAT_LIST,
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

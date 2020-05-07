import { mapActions, mapGetters } from 'vuex';
import {
  Actions, Getters,
} from '../../../store/Sources/constants';
import {
  Actions as LinkActions, Getters as LinkGetters,
} from '../../../store/SourceLinks/constants';

const {
  FETCH,
} = Actions;
const {
  FETCH: fetchCat,
} = LinkActions;

const {
  LIST,
} = Getters;
const {
  LIST: linkList,
} = LinkGetters;

export const getters = {
  ...mapGetters({
    list: LIST,
    linkList,
  }),
};

export const actions = {
  ...mapActions({
    fetchCat,
    fetch: FETCH,
  }),
};

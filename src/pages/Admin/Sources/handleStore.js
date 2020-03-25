import { mapActions } from 'vuex';
import { Actions } from '../../../store/Sources/constants';

const {
  SOURCES_ADD_SOURCE,
} = Actions;

export const getters = {};
export const actions = {
  ...mapActions({
    addSource: SOURCES_ADD_SOURCE,
  }),
};

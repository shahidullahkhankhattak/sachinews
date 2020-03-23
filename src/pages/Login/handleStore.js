import { mapActions, mapGetters } from 'vuex';
import { Actions, Getters } from '../../store/Auth/constants';

const {
  AUTH_AUTHENTICATE,
} = Actions;
const {
  AUTH_ERRORS,
} = Getters;

export const getters = {
  ...mapGetters({
    errors: AUTH_ERRORS,
  }),
};

export const actions = {
  ...mapActions({
    handleSubmit: AUTH_AUTHENTICATE,
  }),
};

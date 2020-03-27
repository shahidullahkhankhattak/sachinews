import { mapActions } from 'vuex';
import { Actions } from '../../store/Auth/constants';

const {
  AUTH_AUTHENTICATE,
} = Actions;

export const actions = {
  ...mapActions({
    handleSubmit: AUTH_AUTHENTICATE,
  }),
};

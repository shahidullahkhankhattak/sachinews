import { mapActions } from 'vuex';
import {
  Actions,
} from '../../../store/Auth/constants';

const {
  AUTH_DEAUTHENTICATE,
} = Actions;

export const actions = {
  ...mapActions({
    logout: AUTH_DEAUTHENTICATE,
  }),
};

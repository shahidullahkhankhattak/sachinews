import { mapActions } from 'vuex';
import { Actions } from '../../store/Auth/constants';

const {
  SET_JWT_AUTH,
} = Actions;

export const actions = {
  ...mapActions({
    setJwtAuth: SET_JWT_AUTH,
  }),
};

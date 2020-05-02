import { mapGetters, mapActions } from 'vuex';
import { Getters } from '../../store/App/constants';
import { Actions } from '../../store/Stories/constants';

const { APP_LOCALE } = Getters;
const { LIKE_STORY } = Actions;

export const getters = {
  ...mapGetters({
    locale: APP_LOCALE,
  }),
};

export const actions = {
  ...mapActions({
    likeStory: LIKE_STORY,
  }),
};

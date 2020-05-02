import { mapGetters, mapActions } from 'vuex';
import { Getters } from '../../store/App/constants';
import { Actions } from '../../store/Stories/constants';

const {
  APP_SITE_DIR,
} = Getters;
const { LIKE_STORY } = Actions;

export const getters = {
  ...mapGetters({
    siteDir: APP_SITE_DIR,
  }),
};


export const actions = {
  ...mapActions({
    likeStory: LIKE_STORY,
  }),
};

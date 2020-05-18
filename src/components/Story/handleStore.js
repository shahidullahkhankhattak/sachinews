import { mapGetters, mapActions } from 'vuex';
import { Getters } from '../../store/App/constants';
import { Actions } from '../../store/Stories/constants';

const {
  APP_SITE_DIR,
  APP_LOCALE,
} = Getters;
const { LIKE_STORY, REMOVE_STORY } = Actions;

export const getters = {
  ...mapGetters({
    siteDir: APP_SITE_DIR,
    locale: APP_LOCALE,
  }),
};


export const actions = {
  ...mapActions({
    likeStory: LIKE_STORY,
    clearStory: REMOVE_STORY,
  }),
};

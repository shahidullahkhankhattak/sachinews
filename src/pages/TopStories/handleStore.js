import { mapGetters, mapActions } from 'vuex';
import { Getters, Actions } from '../../store/Stories/constants';

export const getters = {
  ...mapGetters({
    topStories: Getters.GET_TOP_STORIES,
  }),
};

export const setters = {
  ...mapActions({
    fetchTopStories: Actions.FETCH_TOP_STORIES,
  }),
};

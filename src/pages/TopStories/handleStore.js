import { mapGetters } from 'vuex';
import { Getters } from '../../store/Stories/constants';

export const getters = {
  ...mapGetters({
    topStories: Getters.GET_TOP_STORIES,
  }),
};

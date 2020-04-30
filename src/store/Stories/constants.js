const PREFIX = 'Stories';

export const Actions = {
  FETCH_STORIES: `${PREFIX}/fetchStories`,
  FETCH_STORY: `${PREFIX}/fetchStory`,
};

export const Mutations = {
  FETCH_STORIES: 'fetchStories',
  SET_LOADING: 'setLoading',
  RESET_STORIES: 'resetStories',
  FETCH_STORY: 'fetchStory',
};

export const Getters = {
  LOADING: `${PREFIX}/loading`,
  PER_PAGE: `${PREFIX}/perPage`,
  STORIES: `${PREFIX}/stories`,
  TOTAL: `${PREFIX}/total`,
  STORY: `${PREFIX}/story`,
};

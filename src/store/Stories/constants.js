const PREFIX = 'Stories';

export const Actions = {
  FETCH_STORIES: `${PREFIX}/fetchStories`,
};

export const Mutations = {
  FETCH_STORIES: 'fetchStories',
  SET_LOADING: 'setLoading',
  RESET_STORIES: 'resetStories',
};

export const Getters = {
  LOADING: `${PREFIX}/loading`,
  PER_PAGE: `${PREFIX}/perPage`,
  STORIES: `${PREFIX}/stories`,
  TOTAL: `${PREFIX}/total`,
};

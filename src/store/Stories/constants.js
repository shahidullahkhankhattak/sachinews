const PREFIX = 'Stories';

export const Actions = {
  FETCH_STORIES: `${PREFIX}/fetchStories`,
  FETCH_STORY: `${PREFIX}/fetchStory`,
  LIKE_STORY: `${PREFIX}/likeStory`,
  REMOVE_STORY: `${PREFIX}/removeStory`,
};

export const Mutations = {
  FETCH_STORIES: 'fetchStories',
  SET_LOADING: 'setLoading',
  RESET_STORIES: 'resetStories',
  FETCH_STORY: 'fetchStory',
  LIKE_STORY: 'likeStory',
  REMOVE_STORY: 'removeStory',
};

export const Getters = {
  LOADING: `${PREFIX}/loading`,
  PER_PAGE: `${PREFIX}/perPage`,
  STORIES: `${PREFIX}/stories`,
  TOTAL: `${PREFIX}/total`,
  STORY: `${PREFIX}/story`,
};

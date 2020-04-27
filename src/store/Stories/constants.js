const PREFIX = 'Stories';

export const Actions = {
  FETCH_TOP_STORIES: `${PREFIX}/fetchTopStories`,
};

export const Mutations = {
  FETCH_TOP_STORIES: 'fetchTopStories',
  SET_LOADING: 'setLoading',
};

export const Getters = {
  LOADING: `${PREFIX}/loading`,
  PER_PAGE: `${PREFIX}/perPage`,
  GET_TOP_STORIES: `${PREFIX}/topStories`,
};

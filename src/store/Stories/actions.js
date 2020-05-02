import { apiEndpoints } from '../../api/constants';
import { axiosConfig } from '../../config/constants';
import { Mutations } from './constants';
import axios from '../../api/axios';
import { se2errors } from '../formatters';
import { routeQueryToString } from '../../utils/navigationHelpers';

const {
  STORIES_ENDPOINTS: {
    TOP_STORIES,
    STORY,
  },
  LIKES_ENDPOINTS: {
    REST: LIKES_REST,
  },
} = apiEndpoints;
const {
  FETCH_STORIES,
  SET_LOADING,
  RESET_STORIES,
  FETCH_STORY,
  LIKE_STORY,
} = Mutations;

export async function fetchStories({ commit, rootState, getters: { stories: allStories, total: totalStories, perPage } }, {
  done, refresh, query,
}) {
  const { locale } = rootState.App.config;
  try {
    if (refresh) {
      commit(RESET_STORIES);
      allStories = [];
      totalStories = -1;
    }
    const offset = allStories.length;
    if (totalStories > -1 && offset >= totalStories) {
      return done && done();
    }

    commit(SET_LOADING, true);
    const $query = routeQueryToString({
      ...query,
      offset,
      perPage,
      lang: locale && locale._id,
    });
    const { stories, total } = await axios.get(`${TOP_STORIES}?${$query}`, axiosConfig.noLoader);
    commit(FETCH_STORIES, { stories, total, done });
    commit(SET_LOADING, false);
  } catch (ex) {
    commit(SET_LOADING, false);
    se2errors(ex);
    done && done();
  }
}

export async function fetchStory({ commit }, slug) {
  try {
    commit(SET_LOADING, true);
    const { story } = await axios.get(`${STORY}${slug}`, axiosConfig.noLoader);
    commit(FETCH_STORY, story);
    commit(SET_LOADING, false);
  } catch (ex) {
    commit(SET_LOADING, false);
    se2errors(ex);
  }
}

export async function likeStory({ commit }, { id, main }) {
  try {
    await axios.post(LIKES_REST, { story: id }, axiosConfig.noLoader);
    commit(LIKE_STORY, { id, main });
  } catch (ex) {
    se2errors(ex);
  }
}

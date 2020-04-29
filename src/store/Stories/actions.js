import { apiEndpoints } from '../../api/constants';
import { axiosConfig } from '../../config/constants';
import { Mutations } from './constants';
import axios from '../../api/axios';
import { se2errors } from '../formatters';
import { routeQueryToString } from '../../utils/navigationHelpers';

const {
  STORIES_ENDPOINTS: {
    TOP_STORIES,
  },
} = apiEndpoints;
const {
  FETCH_TOP_STORIES,
  SET_LOADING,
  RESET_STORIES,
} = Mutations;
export async function fetchTopStories({ commit, getters: { topStories: { stories: topStories, total: totalStories }, perPage } }, {
  done, refresh, query,
}) {
  try {
    if (refresh) commit(RESET_STORIES);
    const offset = (refresh && 0) || topStories.length;
    if (totalStories > -1 && offset >= totalStories) { return done && done(); }

    commit(SET_LOADING, true);
    const $query = routeQueryToString({
      ...query,
      offset,
      perPage,
    });
    const { stories, total } = await axios.get(`${TOP_STORIES}?${$query}`, axiosConfig.noLoader);
    commit(FETCH_TOP_STORIES, { stories, total, done });
    commit(SET_LOADING, false);
  } catch (ex) {
    commit(SET_LOADING, false);
    se2errors(ex);
    done && done();
  }
}

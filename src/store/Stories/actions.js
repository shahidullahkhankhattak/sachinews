import { apiEndpoints } from '../../api/constants';
import { axiosConfig } from '../../config/constants';
import { Mutations } from './constants';
import axios from '../../api/axios';
import { se2errors } from '../formatters';

const {
  STORIES_ENDPOINTS: {
    TOP_STORIES,
  },
} = apiEndpoints;
const {
  FETCH_TOP_STORIES,
  SET_LOADING,
} = Mutations;
export async function fetchTopStories({ commit }) {
  try {
    commit(SET_LOADING, true);
    const { stories } = await axios.get(TOP_STORIES, axiosConfig.noLoader);
    commit(FETCH_TOP_STORIES, stories);
    commit(SET_LOADING, false);
  } catch (ex) {
    commit(SET_LOADING, false);
    se2errors(ex);
  }
}

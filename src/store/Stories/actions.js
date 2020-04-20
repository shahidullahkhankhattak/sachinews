import { apiEndpoints } from '../../api/constants';
import { Mutations } from './constants';
import axios from '../../api/axiosNoLoader';
import { se2errors } from '../formatters';

const {
  STORIES_ENDPOINTS: {
    TOP_STORIES,
  },
} = apiEndpoints;

export async function fetchTopStories(context) {
  try {
    const { stories } = await axios.get(TOP_STORIES);
    console.log(stories);
    context.commit(Mutations.FETCH_TOP_STORIES, stories);
  } catch (ex) {
    se2errors(ex);
  }
}

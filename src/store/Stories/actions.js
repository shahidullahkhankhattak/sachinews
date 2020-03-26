import { server } from '../../config/constants';
import { Mutations } from './constants';
import axios from '../../api/axios';

const { API: { HOME } } = server;

export async function fetchTopStories(context) {
  try {
    const response = await axios.get(HOME);
    const { data } = response && response;
    const storiesObj = { error: null, stories: data };
    context.commit(Mutations.FETCH_TOP_STORIES, storiesObj);
  } catch (ex) {
    const storiesObj = {
      error: ex,
      stories: [],
    };
    context.commit(Mutations.FETCH_TOP_STORIES, storiesObj);
  }
}

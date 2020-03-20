import Axios from 'axios';
import { server } from '../../config/constants';
import { Mutations } from './constants';

const { API: { HOME } } = server;

export async function fetchTopStories(context) {
  try {
    const response = await Axios.get(HOME);
    const { data: { data } } = response && response;
    context.commit(Mutations.FETCH_TOP_STORIES, data);
  } catch (ex) {
    console.error(ex);
  }
}

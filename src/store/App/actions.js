
import axios from '../../api/axios';
import { Mutations } from './constants';
import { apiEndpoints } from '../../api/constants';
import { se2errors } from '../formatters';

const {
  SET_LOCALE,
  SET_COUNTS,
} = Mutations;

const {
  COUNTS_ENDPOINTS: {
    REST: REST_API,
  },
} = apiEndpoints;
export function setLocale(context, payload) {
  context.commit(SET_LOCALE, payload);
}

export async function fetchCounts({ commit }) {
  try {
    const { details } = await axios.get(REST_API);
    commit(SET_COUNTS, details);
  } catch (ex) {
    se2errors(ex);
  }
}

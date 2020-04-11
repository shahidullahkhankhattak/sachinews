import axios from '../../api/axios';
import { apiEndpoints } from '../../api/constants';
import { se2errors } from '../formatters';
import { Mutations } from './constants';

const {
  SELECTORS_ENDPOINTS: {
    REST: REST_API,
  },
} = apiEndpoints;
const {
  ADD,
  ALL,
  DELETE,
  UPDATE,
} = Mutations;

export async function add(context, { form, reset }) {
  try {
    const { item } = await axios.post(REST_API, form);
    context.commit(ADD, item);
    reset();
  } catch (ex) {
    se2errors(ex);
  }
}

export async function fetch({ commit }) {
  try {
    const { source_id: sourceId } = this.$router.app.$route && this.$router.app.$route.params;
    const { list } = await axios.get(`${REST_API}/${sourceId}`);
    commit(ALL, list);
  } catch (ex) {
    se2errors(ex);
  }
}

export async function _delete(context, item) {
  try {
    await axios.delete(REST_API, { data: item });
    context.commit(DELETE, item);
  } catch (ex) {
    se2errors(ex);
  }
}

export async function update(context, { item, toggleDialog }) {
  try {
    const { item: _item } = await axios.put(REST_API, item);
    context.commit(UPDATE, _item);
    toggleDialog();
  } catch (ex) {
    se2errors(ex);
  }
}

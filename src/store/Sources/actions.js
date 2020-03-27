import axios from '../../api/axios';
import { apiEndpoints } from '../../api/constants';
import { se2errors } from '../formatters';
import { Mutations } from './constants';

const {
  SOURCE_ENDPOINTS: {
    REST: SOURCE_REST,
  },
} = apiEndpoints;
const {
  ADD_SOURCE,
  ERRORS,
  ALL_SOURCES,
  DELETE_SOURCE,
  UPDATE_SOURCE,
} = Mutations;

export async function addSource(context, { form, reset }) {
  try {
    const slug = form.name.replace(/ /g, '_').toLowerCase();
    form = {
      ...form,
      slug,
    };
    const { source } = await axios.post(SOURCE_REST, form);
    context.commit(ADD_SOURCE, source);
    reset();
  } catch (ex) {
    context.commit(ERRORS, se2errors(ex));
  }
}

export async function fetchAllSources(context) {
  try {
    const { sources } = await axios.get(SOURCE_REST);
    context.commit(ALL_SOURCES, sources);
  } catch (ex) {
    context.commit(ERRORS, se2errors(ex));
  }
}

export async function deleteSource(context, source) {
  try {
    await axios.delete(SOURCE_REST, { data: source });
    context.commit(DELETE_SOURCE, source);
  } catch (ex) {
    context.commit(ERRORS, se2errors(ex));
  }
}

export async function updateSource(context, { item, toggleDialog }) {
  try {
    await axios.put(SOURCE_REST, item);
    context.commit(UPDATE_SOURCE, item);
    toggleDialog();
  } catch (ex) {
    context.commit(ERRORS, se2errors(ex));
  }
}

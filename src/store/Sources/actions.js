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
    se2errors(ex);
  }
}

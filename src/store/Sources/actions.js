import { Notify } from '../../plugins/notify';
import axios from '../../api/axios';
import { setLoading } from '../../config/configSetters';
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

export async function addSource(context, form) {
  try {
    setLoading(true);
    const slug = form.name.replace(/ /g, '_').toLowerCase();
    form = {
      ...form,
      slug,
    };
    const {
      data: {
        source,
        successMessage,
      },
    } = await axios.post(SOURCE_REST, form);
    Notify({
      type: 'positive',
      message: successMessage,
    });
    context.commit(ADD_SOURCE, source);
    setLoading(false);
  } catch (ex) {
    setLoading(false);
    se2errors(ex);
  }
}

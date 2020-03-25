import axios from '../../api/axios';
import { setLoading } from '../../config/configSetters';
import { apiEndpoints } from '../../api/constants';
import { se2errors } from '../formatters';

const {
  SOURCE_ENDPOINTS: {
    REST: SOURCE_REST,
  },
} = apiEndpoints;

export async function addSource(_context, form) {
  try {
    setLoading(true);
    const slug = form.name.replace(/ /g, '_').toLowerCase();
    form = {
      ...form,
      slug,
    };
    const response = await axios.post(SOURCE_REST, form);
    console.log(response);
  } catch (ex) {
    se2errors(ex);
    setLoading(false);
  }
}

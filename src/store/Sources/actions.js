import axios from '../../api/axios';
import { apiEndpoints } from '../../api/constants';
import { se2errors } from '../formatters';
import { Mutations } from './constants';
import { getWithSlug } from '../../helpers/objectHelpers';
import { Notify } from '../../plugins/notify';

const {
  SOURCE_ENDPOINTS: {
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
    const { item } = await axios.post(REST_API, getWithSlug(form));
    context.commit(ADD, item);
    reset();
  } catch (ex) {
    se2errors(ex);
  }
}

export async function fetch({ commit, state }) {
  if (state.list.length) return;
  try {
    const { list } = await axios.get(REST_API);
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
    const { confirmObj } = ex.data;
    const [error] = se2errors(ex);
    if (confirmObj) {
      Notify({
        type: 'negative',
        message: error.msg,
        timeout: 0,
        actions: [
          {
            label: 'Yes',
            bgColor: 'green',
            color: 'white',
            handler: () => {
              _delete(context, confirmObj);
            },
          },
          { label: 'Dismiss', color: 'yellow' },
        ],
      });
    }
  }
}

export async function update(context, { item, toggleDialog }) {
  try {
    const { item: _item } = await axios.put(REST_API, getWithSlug(item));
    context.commit(UPDATE, _item);
    toggleDialog();
  } catch (ex) {
    se2errors(ex);
  }
}

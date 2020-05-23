import axios from '../../api/axios';
import { apiEndpoints } from '../../api/constants';
import { se2errors } from '../formatters';
import { Mutations } from './constants';
import { Actions as CatActions } from '../Categories/constants';
import { Actions as CountryActions } from '../Countries/constants';
import { Notify } from '../../plugins/notify';

const {
  SOURCE_LINKS_ENDPOINTS: {
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

export async function fetch({
  commit, dispatch,
}, sourceId) {
  dispatch(CatActions.FETCH, {}, { root: true });
  dispatch(CountryActions.FETCH, {}, { root: true });
  try {
    const { source_id: sourceIdRoute } = this.$router.app.$route && this.$router.app.$route.params;
    if (!sourceId) { sourceId = sourceIdRoute; }
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
    const { item: _item } = await axios.put(REST_API, item);
    context.commit(UPDATE, _item);
    toggleDialog();
  } catch (ex) {
    se2errors(ex);
  }
}

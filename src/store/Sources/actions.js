import axios from '../../api/axios';
import { apiEndpoints } from '../../api/constants';
import { se2errors } from '../formatters';
import { Mutations } from './constants';
import { getWithSlug } from '../../utils/objectHelpers';
import { Notify } from '../../plugins/notify';
import { axiosConfig } from '../../config/constants';
import { Getters as LanguageGetters } from '../Languages/constants';

const { LIST: LANG_LIST } = LanguageGetters;
const {
  SOURCE_ENDPOINTS: {
    REST: REST_API,
    USER_SOURCE,
  },
} = apiEndpoints;
const {
  ADD,
  ALL,
  DELETE,
  UPDATE,
} = Mutations;

export async function add({ rootGetters, commit }, { form, reset }) {
  try {
    const newForm = { ...form, lang: form.lang.value };
    const { item } = await axios.post(REST_API, getWithSlug(newForm));
    const languages = rootGetters[LANG_LIST];
    const lang = languages.find((_lang) => _lang._id === item.lang);
    Object.assign(item, { lang });
    commit(ADD, item);
    reset();
  } catch (ex) {
    se2errors(ex);
  }
}

export async function fetchUserSources({ commit }, language) {
  try {
    const { list } = await axios.get(`${USER_SOURCE}?lang=${(language && language._id) || ''}`, axiosConfig.noLoader);
    commit(ALL, list);
  } catch (ex) {
    se2errors(ex);
  }
}

export async function fetch({ commit }) {
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

export async function update({ commit, rootGetters }, { item, toggleDialog }) {
  try {
    const newItem = { ...item, lang: item.lang.value };
    const { item: _item } = await axios.put(REST_API, getWithSlug(newItem));
    const languages = rootGetters[LANG_LIST];
    const lang = languages.find((_lang) => _lang._id === _item.lang);
    Object.assign(_item, { lang });
    commit(UPDATE, _item);
    toggleDialog();
  } catch (ex) {
    se2errors(ex);
  }
}

import axios from '../../api/axios';
import { apiEndpoints } from '../../api/constants';
import { se2errors } from '../formatters';
import { Mutations } from './constants';
import { getWithSlug } from '../../utils/objectHelpers';
import { Notify } from '../../plugins/notify';
import { axiosConfig } from '../../config/constants';
import { Getters as LanguageGetters } from '../Languages/constants';
import { Getters as RegionsGetters } from '../Regions/constants';

const { LIST: LANG_LIST } = LanguageGetters;
const { LIST: REGION_LIST } = RegionsGetters;
const {
  COUNTRIES_ENDPOINTS: {
    REST: REST_API,
    USER_COUNTRY,
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
    const newForm = { ...form, lang: form.lang.value, region: form.region.value };
    const { item } = await axios.post(REST_API, getWithSlug(newForm));
    const languages = rootGetters[LANG_LIST];
    const regions = rootGetters[REGION_LIST];
    const region = regions.find((_region) => _region._id === item.region);
    const lang = languages.find((_lang) => _lang._id === item.lang);
    Object.assign(item, { lang, region });
    commit(ADD, item);
    reset();
  } catch (ex) {
    se2errors(ex);
  }
}

export async function fetchUserCountries({ commit }) {
  try {
    const { list } = await axios.get(USER_COUNTRY, axiosConfig.noLoader);
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
    const newItem = { ...item, lang: item.lang.value, region: item.region.value };
    const { item: _item } = await axios.put(REST_API, getWithSlug(newItem));
    const regions = rootGetters[REGION_LIST];
    const region = regions.find((_region) => _region._id === _item.region);
    const languages = rootGetters[LANG_LIST];
    const lang = languages.find((_lang) => _lang._id === _item.lang);
    Object.assign(_item, { lang, region });
    commit(UPDATE, _item);
    toggleDialog();
  } catch (ex) {
    se2errors(ex);
  }
}

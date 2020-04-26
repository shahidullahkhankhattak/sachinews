
import { Actions as sourceActions } from '../../store/Sources/constants';
import { Actions as categoryActions } from '../../store/Categories/constants';

// actions
const { FETCH_USER_SOURCES } = sourceActions;
const { FETCH_USER_CATEGORIES } = categoryActions;

export const preFetchMethods = {
  fetchCategories: ({ store }) => store.dispatch(FETCH_USER_CATEGORIES),
  fetchSources: ({ store }) => store.dispatch(FETCH_USER_SOURCES),
};

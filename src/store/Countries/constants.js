const PREFIX = 'Countries';

export const Getters = {
  LIST: `${PREFIX}/list`,
};

export const Mutations = {
  ADD: 'add',
  ALL: 'all',
  DELETE: '_delete',
  UPDATE: 'update',
};

export const Actions = {
  UPDATE: `${PREFIX}/update`,
  ADD: `${PREFIX}/add`,
  FETCH: `${PREFIX}/fetch`,
  FETCH_USER_COUNTRIES: `${PREFIX}/fetchUserCountries`,
  DELETE: `${PREFIX}/_delete`,
};

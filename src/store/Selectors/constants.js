const PREFIX = 'Selectors';

export const Getters = {
  LIST: `${PREFIX}/list`,
  AUTOCOMPLETE: `${PREFIX}/autocomplete`,
  AUTOCOMPLETE_FILTER: `${PREFIX}/autocompleteFilter`,
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
  DELETE: `${PREFIX}/_delete`,
};

const PREFIX = 'Mock';

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
  DELETE: `${PREFIX}/_delete`,
};

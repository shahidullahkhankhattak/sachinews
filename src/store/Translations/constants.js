const PREFIX = 'Translations';

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
  FETCH_USER_Translations: `${PREFIX}/fetchUserTranslations`,
  DELETE: `${PREFIX}/_delete`,
};

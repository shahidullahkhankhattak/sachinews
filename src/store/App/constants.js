const PREFIX = 'App';
// getters
export const Getters = {
  APP_LOCALE: `${PREFIX}/locale`,
  APP_SITE_DIR: `${PREFIX}/siteDirection`,
  APP_SIDEBAR_POS: `${PREFIX}/sidebarPosition`,
  COUNTS: `${PREFIX}/counts`,
};
// actions
export const Actions = {
  APP_SET_LOCALE: `${PREFIX}/setLocale`,
  APP_FETCH_COUNTS: `${PREFIX}/fetchCounts`,
};

// mutations
export const Mutations = {
  SET_LOCALE: 'setLocale',
  SET_COUNTS: 'setCounts',
};

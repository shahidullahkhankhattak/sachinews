const PREFIX = 'App';
// getters
export const Getters = {
  APP_LOCALE: `${PREFIX}/locale`,
  APP_SITE_DIR: `${PREFIX}/siteDirection`,
  APP_SIDEBAR_POS: `${PREFIX}/sidebarPosition`,
  COUNTRY: `${PREFIX}/country`,
  COUNTS: `${PREFIX}/counts`,
};
// actions
export const Actions = {
  SET_LOCALE: `${PREFIX}/setLocale`,
  SET_COUNTRY: `${PREFIX}/setCountry`,
  FETCH_COUNTS: `${PREFIX}/fetchCounts`,
};

// mutations
export const Mutations = {
  SET_COUNTRY: 'setCountry',
  SET_LOCALE: 'setLocale',
  SET_COUNTS: 'setCounts',
};

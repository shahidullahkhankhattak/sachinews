export function setLocale({ config }, payload) {
  config.locale = { ...payload };
}

export function setCountry({ config }, payload) {
  config.country = { ...payload };
}
export function setCounts(state, payload) {
  state.counts = payload;
}

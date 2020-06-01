export function setLocale({ config }, payload) {
  config.locale = payload && { ...payload };
}

export function setCountry({ config }, payload) {
  config.country = payload && { ...payload };
}
export function setCounts(state, payload) {
  state.counts = payload;
}

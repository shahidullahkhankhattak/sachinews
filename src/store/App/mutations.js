export function setLocale({ config }, payload) {
  config.locale = { ...payload };
}

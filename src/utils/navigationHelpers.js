export function isSidebarLinkActive(pageName) {
  return this.$route.name === pageName;
}

export function routeQueryToString(params) {
  return Object.keys(params).map((key) => `${key}=${params[key]}`).join('&');
}

export function queryParams(name, value, $route) {
  const params = { ...$route.query };
  params[name] = value;
  return routeQueryToString(params);
}

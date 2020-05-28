import { serverBase } from '../config/constants';

export function isSidebarLinkActive(item) {
  return this.$route.fullPath === item.link;
}

export function routeQueryToString(params) {
  return Object.keys(params).map((key) => `${key}=${params[key]}`).join('&');
}

export function queryParams(name, value, $route) {
  const params = { ...$route.query };
  params[name] = value;
  return routeQueryToString(params);
}

export function generateStoryUrl(locale, story) {
  const baseUrl = (process.env.NODE_ENV === 'development' && serverBase.local) || serverBase.production;
  return `${baseUrl}/${locale.iso}/story/${story._id}/${(locale.iso === 'en' && story.slug) || ''}`;
}

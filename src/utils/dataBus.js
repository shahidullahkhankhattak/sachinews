const routerBus = {};

export default routerBus;

export function canGoBack() {
  const prevRouteName = (routerBus.prevRoute && routerBus.prevRoute.name) || '';
  return ((prevRouteName && true) || false);
}

export function shouldReloadStories(vm) {
  const { stories, $route: currentRoute } = vm;
  const prevRoute = routerBus.prevRoute || {};
  const subPrevRoute = routerBus.subPrevRoute || {};
  if (prevRoute.name === 'story-details' && stories.length > 0 && subPrevRoute.fullPath === currentRoute.fullPath) return false;
  return true;
}

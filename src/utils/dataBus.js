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

// watcher bus
export const watcherBus = {
  data: {
    isLoading: false,
  },
  methods: {
    loading: () => {},
  },
  get loading() {
    return this.data.isLoading;
  },
  set loading(val) {
    if (process.browser) {
      if (val) {
        document.body.classList.add('q-body--force-scrollbar', 'q-body--prevent-scroll');
      } else {
        document.body.classList.remove('q-body--force-scrollbar', 'q-body--prevent-scroll');
      }
    }
    this.methods.loading(val);
    this.data.isLoading = val;
  },
  on(param, callback) {
    this.methods[param] = callback;
  },
};

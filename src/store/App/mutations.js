export function setLocale({ config }, payload) {
  config.locale = payload;
}

export function toggleSidebar({ config }) {
  config.isSidebarOpen = !config.isSidebarOpen;
}

export function setSidebarOpen({ config }, payload) {
  config.isSidebarOpen = payload;
}

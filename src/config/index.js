export const config = {
  app: {
    meta: {
      title: 'Sachi News',
      url: 'https://sachinews.com/',
    },
    metaAdmin: {
      title: 'Sachi News - Admin',
    },
    logo: {
      path: '/statics/logo/logo.png',
      sidebarPath: '/statics/icons/icon-512x512.png',
      alt: {
        headerLogo: 'Sachi News Logo',
        sidebarLogo: 'Sachi News Logo Large',
      },
      title: 'Sachi News',
    },
    logoAdmin: {
      path: '/statics/logo/logo.png',
      title: 'Sachi News - Admin',
    },
  },
  socketEnv: {
    development: 'localhost:8081',
    production: '/',
  },
};

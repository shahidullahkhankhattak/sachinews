export const config = {
  app: {
    meta: {
      title: 'Sachi News',
    },
    metaAdmin: {
      title: 'Sachi News - Admin',
    },
    logo: {
      path: '/statics/quasar-logo-full.svg',
      title: 'Sachi News',
      html: '<span class="text-red">SACHI</span> News',
    },
    logoAdmin: {
      path: '/statics/quasar-logo-full.svg',
      title: 'Sachi News - Admin',
      html: '<span class="text-red">SACHI</span> Admin',
    },
  },
  socketEnv: {
    development: 'localhost:8081',
    production: '/',
  },
};

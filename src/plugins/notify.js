import {
  Notify,
} from 'quasar';

const defaults = {
  position: 'top-right',
};

const notifyInstance = (options) => {
  if (typeof options !== 'object') {
    options = { ...defaults, message: options };
  }

  const optionsToUse = { ...defaults, ...options };

  return Notify.create(optionsToUse);
};

export default ({ Vue }) => {
  Vue.prototype.$notify = notifyInstance;
};

export {
  // for use outside components
  notifyInstance as Notify,
};

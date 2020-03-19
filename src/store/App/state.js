import { Screen } from 'quasar';

export default function () {
  return {
    config: {
      locale: 'english',
      isSidebarOpen: Screen.gt.lg,
    },
  };
}

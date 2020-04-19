import { Screen } from 'quasar';
import { wait } from '../utils/asyncHelpers';
import { setters } from './handleStore';

export async function setLocale(newLocale) {
  const { value } = newLocale;
  const isScLg = Screen.gt.sm;

  if (!value || value === this.locale) return;
  if (isScLg) {
    this.$root.$emit('toggleSidebar');
    await wait(200);
  }
  setters.setLocale.bind(this)(newLocale);
  if (isScLg) this.$root.$emit('toggleSidebar');
}

export function setLoading(value) {
  if (value) {
    document.querySelector('.spinner').className = 'spinner';
  } else {
    document.querySelector('.spinner').className += ' no-visible';
    setTimeout(() => {
      document.querySelector('.spinner').className += ' hidden';
    }, 500);
  }
}

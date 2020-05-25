import { Screen } from 'quasar';
import { wait } from '../utils/asyncHelpers';

export async function setLocale(currentValue) {
  const { value } = currentValue;
  const { direction: oldDir } = this.languages.find((lang) => lang.iso === this.locale.iso) || {};
  const newLocale = this.languages.find((lang) => lang.iso === value) || {};
  const { direction: newDir } = newLocale;
  const isScLg = Screen.gt.sm;
  if (!value || oldDir === newDir) return;
  if (isScLg) {
    this.$root.$emit('toggleSidebar');
    await wait(200);
  }
  this.$router.push(`/${newLocale.iso}/`);
}

export function setLoading(value) {
  if (value) {
    document.querySelector('.spinner').className = 'spinner';
  } else {
    document.querySelector('.spinner').className = 'spinner no-visible';
    setTimeout(() => {
      if (!document.querySelector('.spinner').className.includes('hidden')) {
        document.querySelector('.spinner').className += ' hidden';
      }
    }, 500);
  }
}

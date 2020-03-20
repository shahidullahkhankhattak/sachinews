import { Screen } from 'quasar';
import { wait } from '../helpers/asyncHelpers';
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

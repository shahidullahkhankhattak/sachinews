import Vue from 'vue';
import { mapGetters } from 'vuex';
import { Getters } from '../store/Translations/constants';

const getters = mapGetters({
  translations: Getters.LIST,
});

Vue.prototype.$t = function (text) {
  const translations = getters.translations.bind(this)();
  const translation = translations.find((trans) => trans.engText.replace(/[-_]/g, '').toLowerCase() === text.toLowerCase());
  if (translation) { return translation.langText; }
  return text;
};

Vue.prototype.$td = function (text) {
  const translations = getters.translations.bind(this)();
  const translation = translations.find((trans) => trans.engText.replace(/[-_]/g, '').toLowerCase() === text.toLowerCase());
  if (!translation) {
    const textArray = text.split(' ');
    let transText = '';
    let found = false;
    textArray.forEach((txt) => {
      const transWord = translations.find((trans) => trans.engText.replace(/[-_]/g, '').toLowerCase() === txt.toLowerCase());
      if (transWord) {
        transText += `${transWord.langText} `;
        found = true;
      } else {
        transText += `${txt} `;
      }
    });
    if (found) {
      return transText.trim();
    }
  }
  if (translation) { return translation.langText; }
  return text;
};

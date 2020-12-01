import I18n from 'react-native-i18n';
import en from './locales/en';

I18n.fallbacks = true;

I18n.translations = {
  en,
};
I18n.locale = 'jp';
export default I18n;

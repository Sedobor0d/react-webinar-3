import * as translations from './translations'

class I18n {

  constructor(services, config = {}) {
    this.services = services;
    this.config = config;
    this.listeners = [];
    this.lang = 'ru';
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  getLang() {
    return this.lang;
  }

  setLang(lang) {
    this.lang = lang;
    this.services.api.setHeader('Accept-Language', lang)

    for (const listener of this.listeners) listener(this.lang);
  }

  translate(lang, text, plural) {
    let result = translations[lang] && (text in translations[lang])
      ? translations[lang][text]
      : text;

    if (typeof plural !== 'undefined') {
      const key = new Intl.PluralRules(lang).select(plural);
      if (key in result) {
        result = result[key];
      }
    }

    return result;
  }

}

export default I18n;

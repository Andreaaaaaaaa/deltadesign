type TLocaleStore = { [key: string]: string };

class LocaleStore {
  locale: TLocaleStore = {};

  constructor() {
    this.locale = {};
  }

  setLocale(locale: TLocaleStore) {
    this.locale = locale;
  }

  getLocals() {
    return this.locale;
  }
}

export * from './locale.en';
export * from './locale.zh';
export * from './locale.ko';
export const localeStore = new LocaleStore();

export const englishLocale = 'en'

export const availableLocales = [englishLocale]

export interface Locale {
  name: string
  locale: string
}

export const english = {
  name: 'English',
  locale: englishLocale
}

export const locales: Locale[] = [english]

import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { Context } from '@nuxt/types'
import en from '~/locales/en'
import { englishLocale } from '~/locales'

Vue.use(VueI18n)

const fallbackLocale = englishLocale

export default ({ app }: Context) => {
  app.i18n = new VueI18n({
    locale: englishLocale,
    fallbackLocale,
    silentFallbackWarn: true,
    messages: { en }
  })
}

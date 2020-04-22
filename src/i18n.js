import { addMessages, init, getLocaleFromNavigator } from 'svelte-i18n'

import en from './i18n-dictionaries/en.json'
import es from './i18n-dictionaries/es.json'
import zh from './i18n-dictionaries/zh.json'

addMessages('en', en)
addMessages('es', es)
addMessages('zh', zh)

init({
  fallbackLocale: 'en',
  initialLocale: getLocaleFromNavigator(),
})
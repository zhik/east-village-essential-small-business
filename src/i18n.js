import { addMessages, init, getLocaleFromNavigator } from 'svelte-i18n'

import en from './i18n-dictionaries/en.json'
import es from './i18n-dictionaries/es.json'

addMessages('en', en)
addMessages('es', es)

init({
  fallbackLocale: 'en',
  initialLocale: getLocaleFromNavigator(),
})
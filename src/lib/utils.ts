import { languages } from './languages'

export const getLanguageName = (lang: string) =>
  languages.find(({ language }) => language === lang.toUpperCase())?.name ?? lang

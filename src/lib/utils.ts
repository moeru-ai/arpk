import { languages } from './languages'

export const getLanguageName = (lang?: string) =>
  lang
    ? languages.find(({ language }) => language === lang.toUpperCase())?.name ?? lang
    : ''

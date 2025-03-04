import { languages } from './languages'

export const getLanguageName = (lang?: string) =>
  lang !== undefined
    ? languages.find(({ language }) => language === lang.toUpperCase())?.name ?? lang
    : ''

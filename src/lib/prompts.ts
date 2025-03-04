import { env } from 'node:process'

import { getLanguageName } from './utils'

export interface PromptOptions {
  /** The language code of the source text. */
  source_lang?: string
  /** The language code you want to translate to. */
  target_lang: string
}

const source_lang = '{{source_lang}}'
const target_lang = '{{target_lang}}'

const defaultSystemPrompt = (options: PromptOptions) => [
  'You are a professional translator.',
  (options.source_lang === undefined || options.source_lang.toLowerCase() === 'auto')
    ? `please translate the following into ${target_lang},`
    : `please translate the following in ${source_lang} into ${target_lang},`,
  'do not give any text other than the translated content,',
  'and trim the spaces at the end:',
].join(' ')

export const systemPrompt = (options: PromptOptions) =>
  (env.ARPK_SYSTEM_PROMPT ?? defaultSystemPrompt(options))
    .replace(source_lang, getLanguageName(options.source_lang))
    .replace(target_lang, getLanguageName(options.target_lang))

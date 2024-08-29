import { env } from 'std-env'

import type { Options } from '../api/translate'

import { getLanguageName } from './utils'

const source_lang = '{{source_lang}}'
const target_lang = '{{target_lang}}'

const defaultSystemPrompt = [
  'You are a professional translator.',
  `please translate the following in ${source_lang} into ${target_lang},`,
  'do not give any text other than the translated content,',
  'and trim the spaces at the end:',
].join(' ')

export const systemPrompt = (options: Omit<Options, 'text'>) =>
  (env.ARPK_SYSTEM_PROMPT ?? defaultSystemPrompt)
    .replace(source_lang, getLanguageName(options.source_lang))
    .replace(target_lang, getLanguageName(options.target_lang))

import type { RequestBody } from '../server/translate'

import { generateText } from '@xsai/generate-text'

import { systemPrompt } from './prompts'

export interface TranslateOptions extends RequestBody {
  apiKey?: string
  baseURL: string
  model: string
}

export const generateTranslate = async ({
  apiKey,
  baseURL,
  model,
  source_lang,
  target_lang,
  text,

}: TranslateOptions) => generateText({
  apiKey,
  baseURL,
  messages: [
    {
      content: systemPrompt({ source_lang, target_lang }),
      role: 'system',
    },
    {
      content: text,
      role: 'user',
    },
  ],
  model,
}).then(({ text }) => text)

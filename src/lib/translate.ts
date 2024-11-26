import { generateText } from '@xsai/generate-text'

import type { RequestBody } from '../server/translate'

import { systemPrompt } from './prompts'

export interface TranslateOptions extends RequestBody {
  apiBase: string
  apiPath: string
  model: string
}

export const generateTranslate = async ({
  apiBase,
  apiPath,
  model,
  source_lang,
  target_lang,
  text,
}: TranslateOptions) => await generateText({
  base: apiBase,
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
  path: apiPath,
}).then(res => res.text)

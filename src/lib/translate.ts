import type { RequestBody } from '../server/translate'

import { ollama } from './ollama'
import { systemPrompt } from './prompts'

export interface TranslateOptions extends RequestBody {
  model: string
}

export const generateTranslate = async ({
  model,
  source_lang,
  target_lang,
  text,
}: TranslateOptions) => await ollama.generate({
  model,
  prompt: text,
  system: systemPrompt({ source_lang, target_lang }),
}).then(res => res.response.trim())

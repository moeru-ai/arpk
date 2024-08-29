import { Hono } from 'hono'
import { bearerAuth } from 'hono/bearer-auth'
import { Ollama } from 'ollama'
import { env } from 'std-env'

import { languages } from '../lib/languages'

const ollama = new Ollama({
  fetch,
  host: env.ARPK_OLLAMA_HOST ?? 'http://127.0.0.1:11434',
})

const token = env.ARPK_TOKEN

export interface Options {
  /** The language code of the source text. */
  source_lang: string
  /** The language code you want to translate to. */
  target_lang: string
  /** The text you want to translate. */
  text: string
}

export const translate = new Hono()
  .post('/', ...(token ? [bearerAuth({ token })] : []), async (c) => {
    const { source_lang, target_lang, text } = await c.req.json<Options>()

    const sourceLangName = languages.find(({ language }) => language === source_lang)?.name ?? source_lang
    const targetLangName = languages.find(({ language }) => language === target_lang)?.name ?? target_lang

    const { response } = await ollama.generate({
      model: env.ARPK_MODEL ?? 'llama3.1',
      prompt: text,
      system: [
        'You are a professional translator.',
        `please translate the following in ${sourceLangName} into ${targetLangName},`,
        'do not give any text other than the translated content,',
        'and trim the spaces at the end:',
      ].join(' '),
    })

    return c.json({
      alternates: [],
      code: 200,
      data: response.trim(),
      id: Date.now(),
      method: 'ARPK',
      source_lang,
      target_lang,
    })
  })

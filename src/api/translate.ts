import { Hono } from 'hono'
import { Ollama } from 'ollama'
import { env } from 'std-env'

import { languages } from '../lib/languages'

const ollama = new Ollama()

export interface Options {
  /** The language code of the source text. */
  source_lang: string
  /** The language code you want to translate to. */
  target_lang: string
  /** The text you want to translate. */
  text: string
}

export const translate = new Hono()
  .post('/', async (c) => {
    const { source_lang, target_lang, text } = await c.req.json<Options>()

    const response = await ollama.chat({
      messages: [
        {
          content: [
            'You are a professional translator.',
            `Please translate the following into ${languages
              .find(({ language }) => language === target_lang)
              ?.name ?? target_lang
            }, do not give any text other than the translated content:`,
          ].join(' '),
          role: 'system',
        },
        {
          content: text,
          role: 'user',
        },
      ],
      model: env.ARPK_ENV ?? 'llama3.1',
    })

    return c.json({
      alternates: [],
      code: 200,
      data: response.message.content,
      id: Date.now(),
      method: 'Free',
      source_lang,
      target_lang,
    })
  })

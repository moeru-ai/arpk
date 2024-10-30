import { Hono } from 'hono'
import { bearerAuth } from 'hono/bearer-auth'
import { Ollama } from 'ollama'
import { env } from 'std-env'

import { version } from '../../package.json' with { type: 'json' }
import { systemPrompt } from '../lib/prompts'

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

    const model = env.ARPK_MODEL ?? 'llama3.2'

    const { response } = await ollama.generate({
      model,
      prompt: text,
      system: systemPrompt({ source_lang, target_lang }),
    })

    return c.json({
      alternates: [],
      code: 200,
      data: response.trim(),
      id: Date.now(),
      method: `ARPK v${version} (${model})`,
      source_lang,
      target_lang,
    })
  })

import type { PromptOptions } from '../lib/prompts'

import { bearerAuth } from 'hono/bearer-auth'
import { Hono } from 'hono/tiny'

import { version } from '../../package.json'
import { generateTranslate } from '../lib/translate'

export interface CreateTranslateOptions {
  apiKey?: string
  baseURL: string
  model: string
  seed?: number
  token?: string
}

export interface RequestBody extends PromptOptions {
  /** The text you want to translate. */
  text: string
}

export const createTranslate = ({
  apiKey,
  baseURL,
  model,
  seed,
  token,
}: CreateTranslateOptions) => {
  const app = new Hono()

  if (token != null)
    app.use(bearerAuth({ token }))

  app
    .post('/', async (c) => {
      const { source_lang, target_lang, text } = await c.req.json<RequestBody>()

      const data = await generateTranslate({
        apiKey,
        baseURL,
        model,
        seed,
        source_lang,
        target_lang,
        text,
      })

      return c.json({
        alternates: [],
        code: 200,
        data,
        id: Date.now(),
        method: `ARPK v${version} (${model})`,
        source_lang,
        target_lang,
      })
    })

  return app
}
